import react from 'react';
import { ReactDOM } from 'react-dom';

ReactDOM.render(<App />, document.getElementById('root'));

/*When switching between /pacific and /atlantic, there’s no need to involve the server. Our client app already has all the components loaded and ready to go. We just need to swap in the Atlantic component for the Pacific one when clicking on the /atlantic link.
What we’d like clicking the links to do is change the location of the browser without making a web request. With the location updated, we can re-render our React app and rely on Route to appropriately determine which components to render.*/

