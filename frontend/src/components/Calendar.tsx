import React, { useState, useEffect } from 'react';
import type { Tarefa } from '../types/Tarefa';
import type { Diario } from '../types/Diario';
import './Calendar.css';

interface CalendarProps {
  selectedDateStr: string;
  onSelectDate: (dateStr: string) => void;
  tarefas: Tarefa[];
  diarios: Diario[];
}

export default function Calendar({ selectedDateStr, onSelectDate, tarefas, diarios }: CalendarProps) {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  
  // O estado navDate controla o foco da navegação no calendário (qual mês/semana está sendo mostrado)
  const [navDate, setNavDate] = useState<Date>(() => {
    const [y, m, d] = selectedDateStr.split('-').map(Number);
    return new Date(y, m - 1, d || 1);
  });

  useEffect(() => {
    const [y, m, d] = selectedDateStr.split('-').map(Number);
    setNavDate(new Date(y, m - 1, d || 1));
  }, [selectedDateStr]);

  const formatLocalDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDiarioForDate = (dateStr: string): Diario | undefined => {
    return diarios.find(d => d.data === dateStr);
  };

  const getTarefasForDate = (dateStr: string): Tarefa[] => {
    return tarefas.filter(t => t.dataLimite === dateStr);
  };

  const handleNext = () => {
    const next = new Date(navDate);
    if (viewMode === 'month') {
      next.setMonth(next.getMonth() + 1);
    } else if (viewMode === 'week') {
      next.setDate(next.getDate() + 7);
    } else {
      next.setDate(next.getDate() + 1);
    }
    setNavDate(next);
    
    // Na visão diária, atualizar a data selecionada automaticamente
    if (viewMode === 'day') {
      onSelectDate(formatLocalDate(next));
    }
  };

  const handlePrev = () => {
    const prev = new Date(navDate);
    if (viewMode === 'month') {
      prev.setMonth(prev.getMonth() - 1);
    } else if (viewMode === 'week') {
      prev.setDate(prev.getDate() - 7);
    } else {
      prev.setDate(prev.getDate() - 1);
    }
    setNavDate(prev);

    // Na visão diária, atualizar a data selecionada automaticamente
    if (viewMode === 'day') {
      onSelectDate(formatLocalDate(prev));
    }
  };

  const handleToday = () => {
    const today = new Date();
    setNavDate(today);
    onSelectDate(formatLocalDate(today));
  };

  // --- RENDERIZAÇÃO DA VISÃO MENSAL ---
  const renderMonthView = () => {
    const year = navDate.getFullYear();
    const month = navDate.getMonth();

    // Primeiro dia do mês e seu dia da semana
    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay(); // 0: Domingo, 6: Sábado

    // Número de dias no mês
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    // Dias do mês anterior para preenchimento
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    const cells: React.ReactNode[] = [];

    // Preencher dias do mês anterior
    for (let i = startOffset - 1; i >= 0; i--) {
      const prevDate = new Date(year, month - 1, prevMonthTotalDays - i);
      const dateStr = formatLocalDate(prevDate);
      cells.push(
        <div 
          key={`prev-${i}`} 
          className="calendar-cell day-offset"
          onClick={() => {
            onSelectDate(dateStr);
            setNavDate(prevDate);
          }}
        >
          <span className="day-number">{prevDate.getDate()}</span>
        </div>
      );
    }

    // Preencher dias do mês atual
    for (let day = 1; day <= totalDays; day++) {
      const currentDate = new Date(year, month, day);
      const dateStr = formatLocalDate(currentDate);
      const hasDiario = getDiarioForDate(dateStr) !== undefined;
      const dayTasks = getTarefasForDate(dateStr);
      const isSelected = dateStr === selectedDateStr;
      const isToday = dateStr === formatLocalDate(new Date());

      cells.push(
        <div 
          key={`curr-${day}`} 
          className={`calendar-cell ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
          onClick={() => onSelectDate(dateStr)}
        >
          <div className="cell-header">
            <span className="day-number">{day}</span>
            {hasDiario && <span className="diario-indicator" title="Anotação de Diário Existente">📝</span>}
          </div>
          <div className="cell-content">
            {dayTasks.slice(0, 3).map(task => (
              <div 
                key={task.id} 
                className={`calendar-task-badge priority-${task.prioridade.toLowerCase()} ${task.status === 'CONCLUIDA' ? 'completed' : ''}`}
                title={task.titulo}
              >
                {task.titulo}
              </div>
            ))}
            {dayTasks.length > 3 && (
              <div className="calendar-task-more">+{dayTasks.length - 3} mais</div>
            )}
          </div>
        </div>
      );
    }

    // Preencher dias do próximo mês para fechar a grade (máximo 42 células)
    const totalCells = cells.length;
    const nextDaysNeeded = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= nextDaysNeeded; i++) {
      const nextDate = new Date(year, month + 1, i);
      const dateStr = formatLocalDate(nextDate);
      cells.push(
        <div 
          key={`next-${i}`} 
          className="calendar-cell day-offset"
          onClick={() => {
            onSelectDate(dateStr);
            setNavDate(nextDate);
          }}
        >
          <span className="day-number">{i}</span>
        </div>
      );
    }

    const weekdays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

    return (
      <div className="month-view-container">
        <div className="weekdays-grid">
          {weekdays.map(d => <div key={d} className="weekday-header">{d}</div>)}
        </div>
        <div className="days-grid">
          {cells}
        </div>
      </div>
    );
  };

  // --- RENDERIZAÇÃO DA VISÃO SEMANAL ---
  const renderWeekView = () => {
    // Achar o Domingo da semana da navDate
    const sunday = new Date(navDate);
    sunday.setDate(navDate.getDate() - navDate.getDay());

    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(sunday);
      d.setDate(sunday.getDate() + i);
      days.push(d);
    }

    const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    return (
      <div className="week-view-container">
        {days.map((day, idx) => {
          const dateStr = formatLocalDate(day);
          const hasDiario = getDiarioForDate(dateStr) !== undefined;
          const dayTasks = getTarefasForDate(dateStr);
          const isSelected = dateStr === selectedDateStr;
          const isToday = dateStr === formatLocalDate(new Date());

          return (
            <div 
              key={idx} 
              className={`week-day-column ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
              onClick={() => {
                onSelectDate(dateStr);
                setNavDate(day);
              }}
            >
              <div className="week-column-header">
                <span className="weekday-name">{weekdays[idx]}</span>
                <span className="day-number-bubble">{day.getDate()}</span>
                {hasDiario && <span className="diario-indicator">📝 Diário</span>}
              </div>
              
              <div className="week-column-tasks">
                <h4>Tarefas ({dayTasks.length})</h4>
                {dayTasks.length === 0 ? (
                  <p className="no-tasks-text">Sem tarefas</p>
                ) : (
                  dayTasks.map(task => (
                    <div 
                      key={task.id} 
                      className={`week-task-card priority-${task.prioridade.toLowerCase()} ${task.status === 'CONCLUIDA' ? 'completed' : ''}`}
                    >
                      <div className="task-status-dot"></div>
                      <span className="task-card-title">{task.titulo}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // --- RENDERIZAÇÃO DA VISÃO DIÁRIA ---
  const renderDayView = () => {
    const dateStr = formatLocalDate(navDate);
    const hasDiario = getDiarioForDate(dateStr) !== undefined;
    const dayTasks = getTarefasForDate(dateStr);
    const isToday = dateStr === formatLocalDate(new Date());
    const formattedDateString = navDate.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    return (
      <div className="day-view-container">
        <div className="day-header-card">
          <h3>{formattedDateString}</h3>
          {isToday && <span className="today-badge">Hoje</span>}
        </div>

        <div className="day-body-grid">
          <div className="day-info-section">
            <h4>Registro do Diário</h4>
            {hasDiario ? (
              <div className="day-journal-preview">
                <h5>{getDiarioForDate(dateStr)?.titulo || 'Sem título'}</h5>
                <div 
                  className="journal-preview-content" 
                  dangerouslySetInnerHTML={{ __html: getDiarioForDate(dateStr)?.conteudo || '' }}
                />
              </div>
            ) : (
              <div className="day-journal-empty">
                <p>Nenhuma entrada de diário registrada para este dia.</p>
                <button className="btn-action-start" onClick={() => onSelectDate(dateStr)}>
                  Escrever no Diário
                </button>
              </div>
            )}
          </div>

          <div className="day-tasks-section">
            <h4>Tarefas Agendadas</h4>
            {dayTasks.length === 0 ? (
              <p className="no-tasks-text">Nenhuma tarefa agendada para hoje.</p>
            ) : (
              <ul className="day-tasks-list">
                {dayTasks.map(task => (
                  <li 
                    key={task.id} 
                    className={`day-task-item priority-${task.prioridade.toLowerCase()} ${task.status === 'CONCLUIDA' ? 'completed' : ''}`}
                  >
                    <span className="task-bullet"></span>
                    <div className="day-task-info">
                      <strong>{task.titulo}</strong>
                      {task.descricao && <p>{task.descricao}</p>}
                    </div>
                    <span className="task-priority-badge">{task.prioridade}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  };

  const getHeaderTitle = (): string => {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    if (viewMode === 'month') {
      return `${months[navDate.getMonth()]} de ${navDate.getFullYear()}`;
    } else if (viewMode === 'week') {
      const sunday = new Date(navDate);
      sunday.setDate(navDate.getDate() - navDate.getDay());
      const saturday = new Date(sunday);
      saturday.setDate(sunday.getDate() + 6);

      if (sunday.getMonth() === saturday.getMonth()) {
        return `${months[sunday.getMonth()]} de ${sunday.getFullYear()}`;
      } else if (sunday.getFullYear() === saturday.getFullYear()) {
        return `${months[sunday.getMonth()]} - ${months[saturday.getMonth()]} de ${sunday.getFullYear()}`;
      } else {
        return `${months[sunday.getMonth()]} ${sunday.getFullYear()} - ${months[saturday.getMonth()]} ${saturday.getFullYear()}`;
      }
    } else {
      return navDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
    }
  };

  return (
    <div className="calendar-card">
      <div className="calendar-header-toolbar">
        <div className="toolbar-left">
          <h2>{getHeaderTitle()}</h2>
        </div>
        <div className="toolbar-center">
          <button className="nav-btn" onClick={handlePrev}>&lt;</button>
          <button className="today-btn" onClick={handleToday}>Hoje</button>
          <button className="nav-btn" onClick={handleNext}>&gt;</button>
        </div>
        <div className="toolbar-right">
          <div className="view-switcher-group">
            <button 
              className={`switcher-btn ${viewMode === 'month' ? 'active' : ''}`}
              onClick={() => setViewMode('month')}
            >
              Mês
            </button>
            <button 
              className={`switcher-btn ${viewMode === 'week' ? 'active' : ''}`}
              onClick={() => setViewMode('week')}
            >
              Semana
            </button>
            <button 
              className={`switcher-btn ${viewMode === 'day' ? 'active' : ''}`}
              onClick={() => setViewMode('day')}
            >
              Dia
            </button>
          </div>
        </div>
      </div>

      <div className="calendar-view-body">
        {viewMode === 'month' && renderMonthView()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'day' && renderDayView()}
      </div>
    </div>
  );
}
