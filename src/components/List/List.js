import './List.css';
import { nanoid } from 'nanoid';

function List(props) {
	const { items, renderDetails } = props;

	const renderItems = () => {
		if (!items) return (
			<li key={nanoid()}>
				не удалось загрузить список пользователей
			</li>);
		return items.map(({ id, name }) => <li
			key={nanoid()}
			className='nav__item'
		>
			<button
				type='button'
				onClick={() => renderDetails({ id, name })}
			>
				{name}
			</button>
		</li>
		);
	}

	return (
		<nav>
			<ul className='nav__list'>
				{renderItems()}
			</ul>
		</nav>
	);
}

export default List;