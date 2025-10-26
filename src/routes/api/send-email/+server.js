import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export async function POST({ request }) {
  const data = await request.json();
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // SSL/TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },  
    tls: {
      rejectUnauthorized: false, // Ignore les certificats auto-signés
    },
  });

  // 1- Construire l'e-mail
  const mailOptions = {
    from: process.env.SMTP_USER, 
    to: 'subvention@groupedumont.fr',
    subject: `Nouveau lead ${data.informations.nom}`,
    text: `Détails du formulaire soumis :
    - Habitation : ${data.habitation}
    - Statut : ${data.statut}
    - Code postal : ${data.codePostal}
    - Travaux : ${data.travaux.join(', ')}
    - Chauffage : ${data.chauffage}
    - Foyer : ${data.foyer}
    - Revenus : ${data.revenus}
    - Nom : ${data.informations.nom}
    - Prénom : ${data.informations.prenom}
    - Téléphone : ${data.informations.telephone}
    - E-mail : ${data.informations.email}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response('E-mail envoyé avec succès', { status: 200 });
  } catch (err) {
    console.error('Erreur lors de l’envoi de l’e-mail :', err);
    return new Response('Erreur lors de l’envoi de l’e-mail', { status: 500 });
  }
}
