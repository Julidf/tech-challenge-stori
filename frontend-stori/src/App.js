import './App.css';
import AddRecipient from './components/add-recipients/AddRecipients';
import CreateNewsletter from './components/create-newsletter/CreateNewsletter';
import ListRecipients from './components/list-recipients/ListRecipients';

function App() {

  return (
    <div className="App">
      <div className='landing-container'>
        <AddRecipient />
        {/* <ListRecipients /> */}
        <CreateNewsletter />
      </div>
    </div>
  );
}

export default App;