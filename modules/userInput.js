class UserInput {

    constructor(gameLogic) {

        this.gameLogic = gameLogic;

		this.boundHandlerLeftClick = this.handleLeftClick.bind(this);
		this.boundHandleRightClick = this.handleRightClick.bind(this);

        this.addEventListeners();

    }

	// Add event listeners
	addEventListeners() {

		const container = document.querySelector('#board');

		container?.addEventListener('click', this.boundHandlerLeftClick);
		container?.addEventListener('contextmenu', this.boundHandleRightClick)
		container?.addEventListener('contextmenu', (e) => {
			e.preventDefault();
		});
	}

    // Handles left click functionality
	handleLeftClick(event) {

		const cell = event.target.closest('.cell');

		if (!cell) return;

		const index = parseInt(cell.dataset.index, 10);
		this.gameLogic.interactWithCell(index);
	}

    // Handles right click (flagging) functionality
	handleRightClick(event) {

		const cell = event.target.closest('.cell');

		if (!cell) return;

		const index = parseInt(cell.dataset.index, 10);
		this.gameLogic.flagCell(index);
	}

}

export default UserInput;