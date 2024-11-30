import { handleSubmit } from './js/formHandler';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';
import './styles/resets.scss';
import './styles/results.scss';  // Import the results SCSS here

document.getElementById('urlForm').addEventListener('submit', handleSubmit);
