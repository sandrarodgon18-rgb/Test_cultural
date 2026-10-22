// 12 preguntas en dos capas:
// 1-6  Estilo y gustos → puntúan en una época (A..F). Cada época aparece 4 veces.
// 7-12 Dilemas de valores → puntúan en 3 ejes (-4..+4):
//   ordenLibertad, tradicionCambio, individuoComunidad
const QUESTIONS = [
  {
    id: 1,
    theme: 'Plan del sábado',
    title: 'Sábado por la noche, ¿qué plan te llama?',
    text: '',
    options: [
      { label: 'Banquete con vino, música y debate filosófico hasta el amanecer', era: 'A' },
      { label: 'Taberna con hoguera y un juglar contando leyendas', era: 'B' },
      { label: 'Velada en un palacio con teatro, poesía y mucho ingenio', era: 'C' },
      { label: 'Club clandestino con jazz, cócteles y cero preguntas', era: 'E' }
    ]
  },
  {
    id: 2,
    theme: 'Superpoder',
    title: 'Tu superpoder histórico sería...',
    text: '',
    options: [
      { label: 'Dominar la espada y la estrategia desde un castillo', era: 'B' },
      { label: 'Ser el mejor pintor, inventor o escritor de tu ciudad', era: 'C' },
      { label: 'Soltar discursos que encienden a la multitud', era: 'D' },
      { label: 'Espiar y descifrar mensajes secretos', era: 'F' }
    ]
  },
  {
    id: 3,
    theme: 'Banda sonora',
    title: 'La banda sonora de tu vida suena a...',
    text: '',
    options: [
      { label: 'Liras, flautas y coros de tragedia griega', era: 'A' },
      { label: 'Una orquesta romántica con piano apasionado', era: 'D' },
      { label: 'Swing, charlestón y gramófonos', era: 'E' },
      { label: 'Rock, sintetizadores y cantautores con mensaje', era: 'F' }
    ]
  },
  {
    id: 4,
    theme: 'Máquina del tiempo',
    title: 'Te dan un viaje en la máquina del tiempo. ¿Qué presencias?',
    text: '',
    options: [
      { label: 'Los grandes juegos y debates de la Antigüedad', era: 'A' },
      { label: 'Una aventura de caballeros, peregrinos y catedrales', era: 'B' },
      { label: 'El mundo cambiando a toda velocidad: coches, radio y cine', era: 'E' },
      { label: 'La carrera espacial con el mundo dividido en dos bloques', era: 'F' }
    ]
  },
  {
    id: 5,
    theme: 'Objeto',
    title: 'Solo puedes llevarte un objeto...',
    text: '',
    options: [
      { label: 'Un rollo de papiro para discutir tus ideas en la plaza', era: 'A' },
      { label: 'Un telescopio o un mapa con zonas en blanco', era: 'C' },
      { label: 'Una pluma y un cuaderno para escribir un manifiesto', era: 'D' },
      { label: 'Un walkman con una cinta mezclada', era: 'F' }
    ]
  },
  {
    id: 6,
    theme: 'Videojuego',
    title: 'Tu videojuego ideal sería...',
    text: '',
    options: [
      { label: 'Un RPG de caballeros, castillos y mazmorras', era: 'B' },
      { label: 'Una exploración de mundos por descubrir y tesoros escondidos', era: 'C' },
      { label: 'Un juego de estrategia: construir una nación desde cero entre revueltas', era: 'D' },
      { label: 'Un misterio de detectives en una ciudad de jazz y humo', era: 'E' }
    ]
  },
  {
    id: 7,
    theme: 'Crisis',
    title: 'Una ciudad sufre una crisis grave (hambre, epidemia). ¿Qué prefieres?',
    text: '',
    options: [
      { label: 'Un líder con poderes extraordinarios que decida rápido', score: { ordenLibertad: -4 } },
      { label: 'Una asamblea abierta donde todos opinan y votan, aunque se tarde', score: { ordenLibertad: 4 } },
      { label: 'Un reparto organizado de recursos para que nadie se quede sin lo básico', score: { individuoComunidad: 4 } },
      { label: 'Que mercaderes y ciudadanos se organicen libremente: la iniciativa de cada uno encuentra soluciones', score: { individuoComunidad: -4 } }
    ]
  },
  {
    id: 8,
    theme: 'Tradiciones',
    title: 'Una tradición centenaria choca con una idea nueva:',
    text: '',
    options: [
      { label: 'Mantenerla: lo que ha durado siglos guarda sabiduría', score: { tradicionCambio: -4 } },
      { label: 'Cambiarla: que algo sea antiguo no lo hace justo', score: { tradicionCambio: 4 } },
      { label: 'Que cada persona decida si la sigue o no', score: { individuoComunidad: -3 } },
      { label: 'Que lo decida la comunidad entre todos', score: { individuoComunidad: 3 } }
    ]
  },
  {
    id: 9,
    theme: 'Obra pública',
    title: 'Hay que construir una gran obra pública, pero obliga a expropiar terrenos:',
    text: '',
    options: [
      { label: 'Se hace: el bien común va por delante', score: { individuoComunidad: 4 } },
      { label: 'Solo con compensación justa y consentimiento de los afectados', score: { individuoComunidad: -3 } },
      { label: 'Si el Estado lo decide, se ejecuta y no se discute', score: { ordenLibertad: -4 } },
      { label: 'Se debate en público y se decide por votación', score: { ordenLibertad: 4 } }
    ]
  },
  {
    id: 10,
    theme: 'Riesgos',
    title: '¿Qué te parece más peligroso?',
    text: '',
    options: [
      { label: 'El caos y el desorden', score: { ordenLibertad: -4 } },
      { label: 'El poder sin control', score: { ordenLibertad: 4 } },
      { label: 'Perder lo que nos define como pueblo', score: { tradicionCambio: -4 } },
      { label: 'Quedarse inmóvil mientras el mundo avanza', score: { tradicionCambio: 4 } }
    ]
  },
  {
    id: 11,
    theme: 'Expresión',
    title: 'Un escritor publica algo que muchos consideran ofensivo:',
    text: '',
    options: [
      { label: 'Debe poder publicarlo: la libertad de expresión es innegociable', score: { ordenLibertad: 4 } },
      { label: 'Debe haber límites para proteger la convivencia y el orden', score: { ordenLibertad: -4 } },
      { label: 'Que decida el público: quien quiera lo lee y quien no, lo ignora', score: { individuoComunidad: -4 } },
      { label: 'Que la comunidad pueda reaccionar y exigirle responsabilidades', score: { individuoComunidad: 4 } }
    ]
  },
  {
    id: 12,
    theme: 'Futuro',
    title: '¿Qué futuro te gustaría?',
    text: '',
    options: [
      { label: 'Un mundo que conserve su identidad y sus raíces', score: { tradicionCambio: -4 } },
      { label: 'Un mundo transformado por las ideas y la tecnología', score: { tradicionCambio: 4 } },
      { label: 'Un lugar donde cada uno construye su propio camino', score: { individuoComunidad: -4 } },
      { label: 'Una sociedad donde nadie se quede atrás', score: { individuoComunidad: 4 } }
    ]
  }
];
