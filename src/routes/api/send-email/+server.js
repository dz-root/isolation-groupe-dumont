import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export async function POST({ request }) {
  const data = await request.json();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"ISOLATION - GROUPE DUMONT" <${process.env.SMTP_USER}>`,
    to: 'contact@groupedumont.fr',
    cc: 'subvention@groupedumont.fr',
    subject: `[ISOLATION] Nouveau lead ${data.informations.prenom} ${data.informations.nom}`,
    html: `
      <h2>Nouvelle demande d'isolation</h2>

      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 6px; font-weight: bold;">Nom :</td>
          <td style="padding: 6px;">${data.informations.nom}</td>
        </tr>
        <tr>
          <td style="padding: 6px; font-weight: bold;">Prénom :</td>
          <td style="padding: 6px;">${data.informations.prenom}</td>
        </tr>
        <tr>
          <td style="padding: 6px; font-weight: bold;">Téléphone :</td>
          <td style="padding: 6px;">${data.informations.telephone}</td>
        </tr>
        <tr>
          <td style="padding: 6px; font-weight: bold;">E-mail :</td>
          <td style="padding: 6px;">${data.informations.email}</td>
        </tr>
        <tr>
          <td style="padding: 6px; font-weight: bold;">Habitation :</td>
          <td style="padding: 6px;">${data.habitation}</td>
        </tr>
        <tr>
          <td style="padding: 6px; font-weight: bold;">Statut :</td>
          <td style="padding: 6px;">${data.statut}</td>
        </tr>
        <tr>
          <td style="padding: 6px; font-weight: bold;">Foyer :</td>
          <td style="padding: 6px;">${data.foyer} personnes</td>
        </tr>
        <tr>
          <td style="padding: 6px; font-weight: bold;">Revenus Fiscale:</td>
          <td style="padding: 6px;">${data.revenus}</td>
        </tr>
        <tr>
          <td style="padding: 6px; font-weight: bold;">Energie du Chauffage :</td>
          <td style="padding: 6px;">${data.chauffage}</td>
        </tr>
        <tr>
          <td style="padding: 6px; font-weight: bold;">Code postal :</td>
          <td style="padding: 6px;">${data.codePostal}</td>
        </tr>
        <tr style="background-color: #f1f1f1;">
          <td style="padding: 6px; font-weight: bold;">Type de Travaux :</td>
          <td style="padding: 6px; font-weight: bold;">${data.travaux.join(', ')}</td>
        </tr>


      </table>

      <br />
      <p style="font-size: 12px; color: #777;">Email envoyé automatiquement depuis le site <a href="https://isolation.groupedumont.fr/">https://isolation.groupedumont.fr/</a>.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response('E-mail envoyé avec succès', { status: 200 });
  } catch (err) {
    console.error('Erreur lors de l’envoi de l’e-mail :', err);
    return new Response('Erreur lors de l’envoi de l’e-mail', { status: 500 });
  }
}
