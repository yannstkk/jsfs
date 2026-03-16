import { createRoot } from 'react-dom/client';

import BookApp from './components/bookapp.component.jsx';

/*
* create React root element and insert it into document
*/
const bootstrapReact = () => {
      const root = createRoot(document.getElementById('insertReactHere'));  
      const component = <BookApp />;
      root.render(component);
   }


window.addEventListener('DOMContentLoaded', bootstrapReact);
