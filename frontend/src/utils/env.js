export const host = 'http://servicos.multi.com.br:8800'
export const font = 'Poppins'
export const formatarData = (data) => {
  if (data) {
    const partes = data.split('-');
    if (partes.length !== 3) {
      return 'Data inválida';
    }
    const [ano, mes, dia] = partes;
    return `${dia}/${mes}/${ano}`;
  }
};
