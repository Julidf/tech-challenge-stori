import './App.css';
import AddRecipient from './components/add-recipients/AddRecipients';
import CreateNewsletter from './components/create-newsletter/CreateNewsletter';

function App() {

  return (
    <div className="App">
      <div className='landing-container'>
        <AddRecipient />
        <CreateNewsletter />
      </div>
    </div>
  );
}

export default App;