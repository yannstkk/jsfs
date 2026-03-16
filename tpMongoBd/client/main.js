import { createRoot } from 'react-dom/client';

import App from './components/app.component.jsx';

/*
* create React root element and insert it into document
*/
const bootstrapReact = () => {
      const root = createRoot(document.getElementById('insertReactHere'));  
      const component = <App />;
      root.render(component);
   }


window.addEventListener('DOMContentLoaded', bootstrapReact);
