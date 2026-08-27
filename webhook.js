/**
 * CONFIGURAÇÕES GLOBAIS
 */
const CONFIG = {
  EMAIL_FINANCEIRO: "financeiro@empresa.com",
  TEMPO_CACHE_SEGUNDOS: 600, // 10 minutos
  VIEW_APPSHEET: "Financeiro",
};

/**
 * DE-PARA de Empresas para seus respectivos IDs no AppSheet.
 * Idealmente isso poderia vir de uma planilha, mas manter no código é mais rápido.
 */
const MAPA_EMPRESAS = {
  "Empresa A": "APP_ID_A",
  "Empresa B": "APP_ID_B",
  "Empresa C": "APP_ID_C",
};

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      console.warn("Requisição vazia recebida.");
      return gerarRespostaJSON({
        status: "erro",
        motivo: "Requisição sem payload",
      });
    }

    const dados = JSON.parse(e.postData.contents);
    const empresa = dados.empresa;
    const idNota = dados.id_nota;

    // Validação Payload
    if (!empresa || !idNota) {
      console.warn(`Payload inválido: Empresa=${empresa}, idNota=${idNota}`);
      return gerarRespostaJSON({
        status: "ignorado",
        motivo: "Payload inválido, faltam dados obrigatórios",
      });
    }

    //Idempotência
    const cache = CacheService.getScriptCache();
    const chaveDeDuplicidade = `${empresa}_${idNota}`;

    if (cache.get(chaveDeDuplicidade)) {
      console.info(
        `Nota já processada recentemente (bloqueada pelo cache): ${chaveDeDuplicidade}`,
      );
      return gerarRespostaJSON({
        status: "ignorado",
        motivo: "Evento duplicado detectado",
      });
    }

    cache.put(chaveDeDuplicidade, "processado", CONFIG.TEMPO_CACHE_SEGUNDOS);

    // Roteamento
    const appId = MAPA_EMPRESAS[empresa];
    if (!appId) {
      console.error(`Empresa não mapeada no sistema: ${empresa}`);
      return gerarRespostaJSON({
        status: "erro",
        motivo: `Empresa não cadastrada: ${empresa}`,
      });
    }

    const linkAppSheet = `https://www.appsheet.com/start/${appId}#view=${CONFIG.VIEW_APPSHEET}`;

    enviarEmailNotificacao(
      CONFIG.EMAIL_FINANCEIRO,
      empresa,
      idNota,
      linkAppSheet,
    );

    console.info(
      `Sucesso! E-mail enviado para nota ${idNota} da empresa ${empresa}`,
    );
    return gerarRespostaJSON({ status: "sucesso" });
  } catch (erro) {
    // Em produção, isso é essencial para vermos no painel de Execuções do Google
    console.error("Erro crítico no doPost: " + erro.stack);

    return gerarRespostaJSON({
      status: "erro",
      detalhe: "Ocorreu um erro interno no servidor.",
    });
  }
}

function enviarEmailNotificacao(destinatario, empresa, idNota, link) {
  const htmlCorpo = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #2c3e50;">Nova Nota Registrada 📄</h2>
      <p>Foi registrada uma nova nota pela <strong>${empresa}</strong> e precisa de atenção.</p>
      
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #0056b3; margin: 20px 0;">
        <p style="margin: 0;"><strong>Referência da Nota:</strong> ${idNota}</p>
      </div>
      
      <a href="${link}" style="background-color: #0056b3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
        Abrir no AppSheet
      </a>
      
      <p style="margin-top: 30px; font-size: 12px; color: #7f8c8d;">
        Este é um e-mail automático enviado pelo sistema de integração financeira.
      </p>
    </div>
  `;

  MailApp.sendEmail({
    to: destinatario,
    subject: `[Atenção] Nova Nota Lançada - ${empresa} (#${idNota})`,
    htmlBody: htmlCorpo,
  });
}

function gerarRespostaJSON(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
