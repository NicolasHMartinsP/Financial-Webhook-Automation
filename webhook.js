function doPost(e) {
  try {
    const dados = JSON.parse(e.postData.contents);

    const empresa = dados.empresa;
    const idNota = dados.id_nota;

    if (!empresa || !idNota) {
      return resposta({
        status: "ignorado",
        motivo: "Payload inválido",
      });
    }

    const cache = CacheService.getScriptCache();
    const chave = `${empresa}:${idNota}`;

    if (cache.get(chave)) {
      return resposta({
        status: "ignorado",
        motivo: "Evento duplicado",
      });
    }

    cache.put(chave, "ok", 600);

    const empresas = {
      "Empresa A": "APP_ID_A",
      "Empresa B": "APP_ID_B",
      "Empresa C": "APP_ID_C",
    };

    const appId = empresas[empresa];

    if (!appId) {
      return resposta({
        status: "erro",
        motivo: "Empresa não encontrada",
      });
    }

    const view = "Financeiro";

    const link = `https://www.appsheet.com/start/${appId}#view=${view}`;

    enviarEmail("financeiro@empresa.com", empresa, idNota, link);

    return resposta({
      status: "sucesso",
    });
  } catch (erro) {
    return resposta({
      status: "erro",
      detalhe: erro.message,
    });
  }
}

function enviarEmail(destinatario, empresa, idNota, link) {
  const html = `
    <div style="font-family:Arial">

      <h2>Nova Nota Registrada</h2>

      <p>
        Foi registrada uma nova nota pela
        <strong>${empresa}</strong>.
      </p>

      <p>
        Referência:
        <strong>${idNota}</strong>
      </p>

      <a href="${link}">
        Abrir no AppSheet
      </a>

    </div>
  `;

  MailApp.sendEmail({
    to: destinatario,
    subject: `Nova Nota - ${empresa}`,
    htmlBody: html,
  });
}

function resposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
