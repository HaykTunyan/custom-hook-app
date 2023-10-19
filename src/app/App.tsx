import { HeaderComponent } from '../components';
import { TableComponent } from '../page';

function App() {
  return (
    <div className="App">
      <header className='header  bg-sky-700'>
        <HeaderComponent />
      </header>
      <div className='mt-36' />
      <main role='main'>
        <TableComponent />
      </main>
    </div>
  );
}

export default App;
