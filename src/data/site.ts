// Central configuration. Every fact below was verified on public, logged-out sources on 27 Nov 2026.
// Sources are kept next to each fact so the page can cite them.

export const SITE = {
  title: 'Saad Khaled — Running & trail · Discipline en personne',
  description:
    "Concept de site pour Saad Khaled (@saad.khaledd) : coureur route et trail, ambassadeur running Decathlon Maroc. Démonstration non officielle proposée par Mansour Technologies.",
  notice: 'Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.',
  agency: { label: 'Concept digital proposé par Mansour Technologies.', href: 'https://mansourtechnologies.com/' },
  observed: '27 nov. 2026',
};

export const LINKS = {
  instagram: 'https://www.instagram.com/saad.khaledd/',
  instagramDm: 'https://ig.me/m/saad.khaledd',
  youtube: 'https://www.youtube.com/@SaadKhaledd',
  youtubeShorts: 'https://www.youtube.com/@SaadKhaledd/shorts',
  tiktok: 'https://www.tiktok.com/@saadkhaledd',
  strava: 'https://www.strava.com/athletes/148373649',
  threads: 'https://www.threads.com/@saad.khaledd',
  facebook: 'https://www.facebook.com/saad.khaled.970889',
  // A WhatsApp number appears on his Linktree. It is NOT hard-coded: inserted only on Saad's approval.
  whatsapp: null as string | null,
};

export const CHANNELS = [
  { name: 'Instagram', handle: '@saad.khaledd', href: LINKS.instagram, stat: '79,4 k abonnés', note: '815 publications' },
  { name: 'YouTube', handle: '@SaadKhaledd', href: LINKS.youtube, stat: '1 286 586 vues', note: '574 vidéos · 2,25 k abonnés' },
  { name: 'TikTok', handle: '@saadkhaledd', href: LINKS.tiktok, stat: '6 729 abonnés', note: '101,3 k j’aime' },
  { name: 'Strava', handle: 'Saad Khaled', href: LINKS.strava, stat: 'Profil athlète', note: 'activités non publiques' },
  { name: 'Threads', handle: '@saad.khaledd', href: LINKS.threads, stat: '885 abonnés', note: '424 threads' },
  { name: 'Facebook', handle: 'Saad Khaled', href: LINKS.facebook, stat: 'Profil', note: 'lien de son Linktree' },
];

export type Short = { id: string; date: string; title: string; caption: string; pos?: string };
// Official YouTube Shorts of @SaadKhaledd. Posters are YouTube-hosted (i.ytimg.com) and only ever used
// as the click-to-play control of the same video.
export const SHORTS: Record<string, Short> = {
  hero: { id: 'HV8YQGQB4Wc', date: '8 nov. 2026', title: 'Short officiel du 8 novembre 2026', caption: 'Bras levés, sur la route', pos: '50% 38%' },
  mist: { id: 'MPU6D9Fhsuk', date: '31 oct. 2026', title: 'Short officiel du 31 octobre 2026', caption: 'Piste rouge, matin de brume', pos: '42% 55%' },
  clay: { id: 'Sty16pwTovU', date: '11 nov. 2026', title: 'Short officiel du 11 novembre 2026', caption: 'Terre rouge, eucalyptus', pos: '55% 60%' },
  track: { id: '3bmQsvEA8P4', date: '5 nov. 2026', title: 'Short officiel du 5 novembre 2026', caption: 'Piste d’athlétisme, plein soleil', pos: '50% 50%' },
  corniche: { id: 'aGi6dSg95SU', date: '17 nov. 2026', title: 'Short officiel du 17 novembre 2026', caption: 'Palmiers et front de mer', pos: '50% 45%' },
  forest: { id: 'krPT2DTU0IQ', date: '31 oct. 2026', title: 'Short officiel du 31 octobre 2026 (forêt)', caption: 'En forêt, dans le sillage', pos: '50% 55%' },
  raceday: { id: 'F2o41OI-jOU', date: '16 oct. 2026', title: 'Short officiel du 16 octobre 2026', caption: 'Jour de course, maillot « 16ème édition »', pos: '45% 30%' },
  decarun: { id: 'H_Y_iuIymLU', date: '22 nov. 2026', title: 'Race review decarun 2026', caption: 'Race review Decarun 2026', pos: '45% 30%' },
  casaeve: { id: 'f5Ozd90vxPU', date: '24 oct. 2026', title: 'L’état d’esprit pour le Casamarathon', caption: 'La veille du Casamarathon', pos: '50% 35%' },
  late: { id: 'dqrRnZcPgYU', date: '14 oct. 2026', title: 'Il n’est jamais trop tard', caption: '« Il n’est jamais trop tard »', pos: '50% 35%' },
  community: { id: 'o7rSgIGCYwE', date: '21 oct. 2026', title: 'Getting my community ready for their marathons', caption: 'Préparer sa communauté au marathon', pos: '50% 50%' },
  sas: { id: 'wyszIuAg7nA', date: '21 oct. 2026', title: 'L’explication des SAS de départ', caption: 'Les SAS de départ, expliqués', pos: '50% 40%' },
  beginner: { id: '7bD7y14gWX8', date: '20 oct. 2026', title: 'Comment progresser en course à pied en tant que débutant ?', caption: 'Progresser quand on débute', pos: '50% 40%' },
  shoes: { id: 'zGaOyBfEMrw', date: '2 nov. 2026', title: 'Kifach nkhtar mes chaussures running ?', caption: 'Choisir ses chaussures', pos: '50% 35%' },
};

// Official results — RaceTimer Morocco (official timer; linked from casablancamarathon.com/resultats).
export const RESULTS = [
  {
    race: 'Deca Run 2026', sub: '10 km by Decathlon Maroc', date: '22 nov. 2026', iso: '2026-11-22', dist: '10 km',
    net: '51:31', gun: '53:35', rank: '573 / 1 193', bib: '1096',
    url: 'https://results.racetimermorocco.com/fr/event/1206/participants/2175997',
    film: 'decarun', best: true,
  },
  {
    race: 'Casa Marathon 2026', sub: '17e édition · semi-marathon', date: '25 oct. 2026', iso: '2026-10-25', dist: '21,097 km',
    net: '1:57:52', gun: '2:02:07', rank: '3 078 / 6 594', bib: '17381',
    url: 'https://results.racetimermorocco.com/fr/event/1194/participants/1746392',
    film: 'casaeve',
  },
  {
    race: '10 km International', sub: 'by WeCasablanca', date: '17 mai 2026', iso: '2026-05-17', dist: '10 km',
    net: '56:22', gun: '1:05:14', rank: '4 038 / 6 642', bib: '14145',
    url: 'https://results.racetimermorocco.com/fr/event/1132/participants/1100742',
  },
  {
    race: 'Decarun', sub: '2e édition · le 10 km by Decathlon Maroc', date: '16 nov. 2025', iso: '2025-11-16', dist: '10 km',
    net: '52:00', gun: '52:38', rank: '437 / 857', bib: '870',
    url: 'https://results.racetimermorocco.com/fr/event/1086/participants/343496',
  },
  {
    race: 'Marathon International de Casablanca', sub: '16e édition · 21 km', date: '26 oct. 2025', iso: '2025-10-26', dist: '21 km',
    net: '1:57:51', gun: '2:04:40', rank: '2 010 / 4 517', bib: '3370',
    url: 'https://results.racetimermorocco.com/fr/event/1049/participants/316254',
  },
];

export const MILESTONES = [
  { date: '21 mai 2023', title: 'La chaîne YouTube démarre', text: 'Date d’activité affichée sur @SaadKhaledd. 574 vidéos depuis, presque toutes en format court.', src: LINKS.youtube, srcLabel: 'YouTube · à propos' },
  { date: '26 oct. 2025', title: '21 km à Casablanca', text: 'Marathon International de Casablanca, 16e édition : 1:57:51 en temps net.', src: 'https://results.racetimermorocco.com/fr/event/1049/participants/316254', srcLabel: 'RaceTimer Morocco' },
  { date: '16 nov. 2025', title: 'Premier Decarun', text: 'Le 10 km by Decathlon Maroc, 2e édition : 52:00 en temps net.', src: 'https://results.racetimermorocco.com/fr/event/1086/participants/343496', srcLabel: 'RaceTimer Morocco' },
  { date: '13 déc. 2025', title: 'Master en marketing digital', text: 'Il l’annonce lui-même, en remerciant ses parents.', src: 'https://www.instagram.com/saad.khaledd/p/DSNZJmeiKAl/', srcLabel: 'Instagram, 13 déc. 2025' },
  { date: '23 juin 2026', title: 'Ambassadeur running Decathlon Maroc', text: 'Decathlon Maroc annonce « notre nouvel ambassadeur running, @saad.khaledd ».', src: 'https://www.instagram.com/p/DZ76vOwjYxz/', srcLabel: '@decathlon.ma, 23 juin 2026' },
  { date: '25 oct. 2026', title: 'Le semi du Casa Marathon', text: '17e édition : 1:57:52 en temps net, au milieu de 6 594 classés.', src: 'https://results.racetimermorocco.com/fr/event/1194/participants/1746392', srcLabel: 'RaceTimer Morocco' },
  { date: '22 nov. 2026', title: '70 km dans la semaine, 51:31 sur 10 km', text: 'Deca Run 2026 en 51:31 net, son meilleur 10 km parmi les résultats officiels relevés. Le même jour : « 70 KM cette semaine. »', src: 'https://www.instagram.com/saad.khaledd/p/DgDrSF_juuN/', srcLabel: 'Instagram, 22 nov. 2026' },
];

// His own captions, quoted verbatim, with date and link.
export const VOICE = [
  { q: 'Koulma jriti bezaf, koulma tu t’améliores d’une façon incroyable !', d: '25 nov. 2026', href: 'https://www.instagram.com/saad.khaledd/reel/DgQfQm6BZsr/' },
  { q: '70 km done. The journey continues.', d: '22 nov. 2026', href: 'https://www.instagram.com/saad.khaledd/p/DgDrSF_juuN/' },
  { q: 'Il n’est jamais trop tard', d: '14 oct. 2026', href: 'https://www.youtube.com/shorts/dqrRnZcPgYU' },
  { q: 'Et oui, ahsan community o mafihach chek !', d: '23 nov. 2026', href: 'https://www.instagram.com/saad.khaledd/reel/DgGVXE-uUKy/' },
  { q: 'See you soon, et nodo tjriw', d: '22 nov. 2026', href: 'https://www.instagram.com/saad.khaledd/reel/DgDg6QDupnk/' },
];

export const DECATHLON_FORMATS = [
  { t: 'RUN’DIROHA', d: '18 oct. 2026', href: 'https://www.youtube.com/shorts/nou1LF8O3pc' },
  { t: 'Comment progresser en course à pied en tant que débutant ?', d: '20 oct. 2026', href: 'https://www.youtube.com/shorts/7bD7y14gWX8' },
  { t: 'Kifach nkhtar mes chaussures running ?', d: '2 nov. 2026', href: 'https://www.youtube.com/shorts/zGaOyBfEMrw' },
  { t: 'Test du trajet Decarun', d: '2 nov. 2026', href: 'https://www.youtube.com/shorts/Zo5BtbN6bsU' },
  { t: 'RUNDIROHA', d: '21 nov. 2026', href: 'https://www.youtube.com/shorts/X_igZHATNWA' },
  { t: 'Race review decarun 2026', d: '22 nov. 2026', href: 'https://www.youtube.com/shorts/H_Y_iuIymLU' },
];

// Names shown only as Instagram highlight titles. Nature and dates of any collaboration not verified.
export const OTHER_MENTIONS = ['Ginsa+', 'FRMA', 'One Run', 'ODARYM', 'LIVEFOOTZONE'];

export const SERIES = ['Race Review', 'Trail Review', 'GroupReview', 'Events'];

export const NAV = [
  { km: '0', label: 'Départ', href: '#depart' },
  { km: '5', label: 'Parcours', href: '#parcours' },
  { km: '10', label: 'Chrono', href: '#chrono' },
  { km: '15', label: 'Terrain', href: '#terrain' },
  { km: '18', label: 'Partenaires', href: '#partenaires' },
  { km: '21', label: 'Contact', href: '#arrivee' },
];
