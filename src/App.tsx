import { RouterProvider } from 'react-router-dom';
import AppRouter from './Router';

const App = () => {
	return (
		<div className="min-h-screen bg-navy-900 text-gold-100 w-screen">
			<RouterProvider router={AppRouter} />
		</div>
	)
}

export default App;
