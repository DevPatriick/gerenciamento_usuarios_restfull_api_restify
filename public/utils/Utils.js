// Classe Utils contém métodos auxiliares que podem ser usados em diferentes partes do código.
// A classe é estática, ou seja, seus métodos podem ser chamados diretamente sem a necessidade de instanciá-la.

class Utils {

    // Método estático que formata a data no formato 'dd/mm/yyyy hh:mm'.
    static dateFormat(date){
        // Obtém o dia do mês (getDate()), mês (getMonth()) e ano (getFullYear()).
        // O mês é incrementado por 1, pois o método getMonth() retorna o mês com base em índice (0-11).
        // Também obtém as horas (getHours()) e os minutos (getMinutes()) da data.
        // Em seguida, esses valores são concatenados em uma string no formato desejado.
        
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
    }
}
