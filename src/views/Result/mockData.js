export const TABS = [
  { id: 'patents', label: 'Patent' },
  { id: 'publications', label: 'Publication' },
  { id: 'products', label: 'Products' },
  { id: 'provisional', label: 'Provisional Specification' },
  { id: 'non-provisional', label: 'Non-Provisional Specification' },
];

export const DUMMY_PATENTS = [
  {
    id: "US8352026B2",
    title: "Implantable pulse generators and methods for selective nerve stimulation",
    date: "2013-01-08",
    author: "Anthony DiUbaldi",
    desc: "This waveform is able to penetrate efficiently through the tissue to reach the target nerve with minimal loss in the strength of the electrical signal..."
  },
  {
    id: "US9283394B2",
    title: "Implantable microstimulators and methods for unidirectional pulse wave",
    date: "2016-03-15",
    author: "Todd K. Whitehurst",
    desc: "Means for receiving and/or transmitting signals via telemetry; means for receiving and/or storing electrical power within the microstimulator..."
  }
];

export const TAB_DATA = {
  Patent: [
    { id: 'US8352026B2', date: '2013-01-08', author: 'Anthony DiUbaldi', title: 'Implantable pulse generators and methods for selective nerve stimulation', desc: 'This waveform is able to penetrate efficiently through the tissue to reach the target nerve with minimal loss in the strength of the electrical signal...' },
    { id: 'US9283394B2', date: '2016-03-15', author: 'Todd K. Whitehurst', title: 'Implantable microstimulators and methods for unidirectional pulse wave', desc: 'Means for receiving and/or transmitting signals via telemetry; means for storing electrical power within the microstimulator...' },
  ],
  Publication: [
    { id: 'PUB-9921', date: '2022-11-10', author: 'Dr. Sarah Smith', title: 'Advancements in Neural Waveform Modulation', desc: 'A detailed study on the efficacy of unidirectional pulse waves in clinical trials...' }
  ],
  Products: [],
  'Provisional Specification': [],
  'Non-Provisional Specification': []
};