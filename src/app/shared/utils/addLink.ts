export class AddLink {
  public static createLinkAndDispachterClick(name: string) {
    const body = document.body;
    const element = document.createElement('a');
    element.href = `#${name}`; // Define a url
    element.className = 'hide-link'; // Adiciona uma classe css pra ocultar
    element.style.display = 'none';
    // Adiciona no corpo da página (necessário para evitar comportamento constiado em diferentes navegadores)
    body.appendChild(element);
    if (element.hasOwnProperty('fireEvent')) {
      // Simula o click pra navegadores com suporte ao fireEvent
      element['fireEvent']('onclick');
    } else {
      // Simula o click com MouseEvents
      const evObj = document.createEvent('MouseEvents');
      evObj.initEvent('click', true, false);
      // element.dispatchEvent(evObj);
    }
    // Remove o link da página
    setTimeout(function() {
      // body.removeChild(element);
    }, 100);
  }
}
