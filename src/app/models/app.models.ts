export interface LoginDTO {
  email: string;
  senha: string;
}

export interface RegistroDTO {
  nome: string;
  email: string;
  senha: string;
}

export interface UsuarioDto {
  id?: number;
  nome?: string;
  email?: string;
  role?: string;
  rolesList?: string[];
  permissao?: string;
}

export interface Capitulo {
  id?: number;
  livro_id?: number;
  numeroCapitulo?: number;
  tituloCapitulo?: string;
  conteudo?: string;
}

export interface Livro {
  id?: number;
  titulo: string;
  genero?: string;
  descricao: string;
  secao_id?: number;
  restrito: boolean;
  capitulos?: Capitulo[];
}