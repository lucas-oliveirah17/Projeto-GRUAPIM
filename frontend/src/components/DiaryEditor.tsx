import { useState, useEffect, useRef } from 'react';
import { diarioService } from '../services/diarioService';
import { ApiError } from '../exceptions/ApiError';
import type { Diario } from '../types/Diario';
import './DiaryEditor.css';

interface DiaryEditorProps {
  selectedDateStr: string;
  onSaveSuccess: () => void;
}

export default function DiaryEditor({ selectedDateStr, onSaveSuccess }: DiaryEditorProps) {
  const [diarioId, setDiarioId] = useState<number | undefined>(undefined);
  const [titulo, setTitulo] = useState<string>('');
  const [conteudo, setConteudo] = useState<string>('');
  const [carregando, setCarregando] = useState<boolean>(false);
  const [salvando, setSalvando] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  
  const editorRef = useRef<HTMLDivElement>(null);

  // Formatar a data para exibição amigável
  const getFormattedDateLabel = () => {
    const [y, m, d] = selectedDateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Carregar entrada de diário para a data selecionada
  useEffect(() => {
    let montado = true;
    const carregarEntrada = async () => {
      setCarregando(true);
      setErro(null);
      setStatusMsg(null);
      try {
        const dados = await diarioService.buscarPorData(selectedDateStr);
        if (montado) {
          if (dados) {
            setDiarioId(dados.id);
            setTitulo(dados.titulo || '');
            setConteudo(dados.conteudo || '');
            if (editorRef.current) {
              editorRef.current.innerHTML = dados.conteudo || '';
            }
          } else {
            setDiarioId(undefined);
            setTitulo('');
            setConteudo('');
            if (editorRef.current) {
              editorRef.current.innerHTML = '';
            }
          }
        }
      } catch (error) {
        if (montado) {
          if (error instanceof ApiError) {
            setErro(`Erro ao carregar diário: ${error.message}`);
          } else {
            setErro('Erro de conexão ao carregar diário.');
          }
        }
      } finally {
        if (montado) setCarregando(false);
      }
    };

    carregarEntrada();
    return () => { montado = false; };
  }, [selectedDateStr]);

  const handleEditorInput = () => {
    if (editorRef.current) {
      setConteudo(editorRef.current.innerHTML);
    }
  };

  // Formatar texto selecionado no editor
  const formatText = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    handleEditorInput();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  // Salvar entrada
  const handleSalvar = async () => {
    setSalvando(true);
    setErro(null);
    setStatusMsg('Salvando...');
    try {
      const payload = {
        id: diarioId,
        data: selectedDateStr,
        titulo: titulo.trim(),
        conteudo: conteudo
      };
      const salvo = await diarioService.salvar(payload);
      setDiarioId(salvo.id);
      setStatusMsg('Alterações salvas com sucesso!');
      onSaveSuccess();
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (error) {
      if (error instanceof ApiError) {
        setErro(`Erro ao salvar: ${error.message}`);
      } else {
        setErro('Erro de rede ao salvar diário.');
      }
      setStatusMsg(null);
    } finally {
      setSalvando(false);
    }
  };

  // Excluir entrada
  const handleExcluir = async () => {
    if (!diarioId) return;
    if (!window.confirm('Tem certeza de que deseja excluir as anotações deste dia?')) return;

    setSalvando(true);
    setErro(null);
    setStatusMsg('Excluindo...');
    try {
      await diarioService.excluir(selectedDateStr);
      setDiarioId(undefined);
      setTitulo('');
      setConteudo('');
      if (editorRef.current) {
        editorRef.current.innerHTML = '';
      }
      setStatusMsg('Anotação excluída!');
      onSaveSuccess();
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (error) {
      if (error instanceof ApiError) {
        setErro(`Erro ao excluir: ${error.message}`);
      } else {
        setErro('Erro de rede ao excluir.');
      }
      setStatusMsg(null);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="diary-editor-container">
      <div className="diary-editor-header">
        <div className="date-badge">{getFormattedDateLabel()}</div>
        <div className="status-indicators">
          {statusMsg && <span className="status-badge success-msg">{statusMsg}</span>}
          {erro && <span className="status-badge error-msg">{erro}</span>}
        </div>
      </div>

      <div className="editor-input-group">
        <input
          type="text"
          className="diary-title-input"
          placeholder="Título da anotação (opcional)..."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          disabled={carregando || salvando}
        />
      </div>

      {/* Barra de Formatação */}
      <div className="rich-text-toolbar">
        <button 
          type="button" 
          className="toolbar-action-btn font-bold" 
          title="Negrito" 
          onClick={() => formatText('bold')}
          disabled={carregando || salvando}
        >
          B
        </button>
        <button 
          type="button" 
          className="toolbar-action-btn font-italic" 
          title="Itálico" 
          onClick={() => formatText('italic')}
          disabled={carregando || salvando}
        >
          I
        </button>
        <button 
          type="button" 
          className="toolbar-action-btn font-underline" 
          title="Sublinhado" 
          onClick={() => formatText('underline')}
          disabled={carregando || salvando}
        >
          U
        </button>
        <div className="toolbar-separator"></div>
        <button 
          type="button" 
          className="toolbar-action-btn" 
          title="Título 1" 
          onClick={() => formatText('formatBlock', '<h1>')}
          disabled={carregando || salvando}
        >
          H1
        </button>
        <button 
          type="button" 
          className="toolbar-action-btn" 
          title="Título 2" 
          onClick={() => formatText('formatBlock', '<h2>')}
          disabled={carregando || salvando}
        >
          H2
        </button>
        <div className="toolbar-separator"></div>
        <button 
          type="button" 
          className="toolbar-action-btn" 
          title="Lista com Marcadores" 
          onClick={() => formatText('insertUnorderedList')}
          disabled={carregando || salvando}
        >
          • Lista
        </button>
        <button 
          type="button" 
          className="toolbar-action-btn" 
          title="Lista Numerada" 
          onClick={() => formatText('insertOrderedList')}
          disabled={carregando || salvando}
        >
          1. Lista
        </button>
        <div className="toolbar-separator"></div>
        <button 
          type="button" 
          className="toolbar-action-btn" 
          title="Limpar Formatação" 
          onClick={() => formatText('removeFormat')}
          disabled={carregando || salvando}
        >
          Limpar
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="editor-paper-wrapper">
        {carregando ? (
          <div className="editor-loading-overlay">
            <span className="spinner"></span>
            Carregando diário do dia...
          </div>
        ) : null}
        
        <div
          ref={editorRef}
          className="diary-content-editor"
          contentEditable={!carregando && !salvando}
          onInput={handleEditorInput}
          placeholder="Como foi o seu dia? Registre suas reflexões, ideias e acontecimentos aqui..."
        ></div>
      </div>

      <div className="diary-editor-actions">
        {diarioId && (
          <button
            type="button"
            className="btn-delete-diary"
            onClick={handleExcluir}
            disabled={carregando || salvando}
          >
            Excluir Dia
          </button>
        )}
        <button
          type="button"
          className="btn-save-diary"
          onClick={handleSalvar}
          disabled={carregando || salvando || (!titulo.trim() && !conteudo.trim())}
        >
          {salvando ? 'Salvando...' : 'Salvar Diário'}
        </button>
      </div>
    </div>
  );
}
