import { useEffect, useState } from 'react';
import './App.css';
import Details from './components/Details/Details';
import List from './components/List/List';

function App() {
	const [userList, setUserList] = useState([]);
	const [activeUser, setActiveUser] = useState([]);
	const userListURL = 'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json';

	useEffect(() => {
		const getUserList = async () => {
			let data = ['не удалось загрузить список пользователей'];
			setUserList(data);
			try {
				const response = await fetch(userListURL);
				if (!response.ok) {
					throw new Error(response.status);
				}
				data = await response.json();
			} catch (err) {
				console.log(err);
			} finally {
				setUserList(data);
			};
		};
		getUserList();
	}, []);

	const renderDetails = (user) => {
		setActiveUser(user);
	};

	return (
		<div className="wrapper">
			<div className="app">
				<div className="main">
					<Details info={activeUser} />
				</div>
				<div className="sidebar">
					<List items={userList} renderDetails={renderDetails} />
				</div>
			</div>
		</div>
	);
}

export default App;
