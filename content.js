chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.getSelectedWord) {
		sendResponse(
			window
				.getSelection()
				.toString()
				.split(' ')[0]
		);
	}
});
