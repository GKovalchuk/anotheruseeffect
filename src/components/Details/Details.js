import './Details.css';
import { useEffect, useState } from 'react';

function Details(props) {
	const { id, name } = props.info;
	const [userDetails, setUserDetails] = useState({});
	const userDetailsURL = new URL(`${id}.json`, 'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/');

	useEffect(() => {
		const getUserDetails = async () => {
			setUserDetails({
				name: name,
				avatar: '',
				details: {
					city: 'Идет загрузка, подождите',
					company: 'Идет загрузка, подождите',
					position: 'Идет загрузка, подождите'
				}
			});
			let data = {
				name: name, details: { city: 'Произошла ошибка' }
			};
			try {
				const response = await fetch(userDetailsURL);
				if (!response.ok) throw new Error(response.status);
				data = await response.json();
			} catch (err) {
				console.error(err);
			} finally {
				await setUserDetails(data);
			}
		};
		if (id) getUserDetails();
	}, [id]);

	const renderDetails = () => {
		const { avatar, name, details } = userDetails;
		const { city, company, position } = details;
		let avatarText = 'Идет загрузка, подождите';
		if (avatar) avatarText = name;
		return (
			<>
				<div className="details__img">
					<img src={avatar} alt={avatarText} />
				</div>
				<div className="details__text-name details__text">{name}</div>
				<div className="details__text">City: {city}</div>
				<div className="details__text">Company: {company}</div>
				<div className="details__text">Position: {position}</div>
			</>
		);
	};

	return (
		<div className="details">
			{userDetails.name && renderDetails()}
		</div>
	);
}

export default Details;