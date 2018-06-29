class MessageManager {
    constructor () {
        firebase.initializeApp({
            databaseURL: "https://yamadashi-test.firebaseio.com"
        });

        this.messagesRef = firebase.database().ref('messages');
        this._setEventHandler();
    }
    
    _setEventHandler() {
        $('.message-form').submit(this.onSubmitForm.bind(this));
        this.messagesRef.on('child_added', this.onMessagesChildAdded.bind(this));
    }

    onMessagesChildAdded(snapshot) {
        const message = snapshot.val();
        const author = message.author || "名無し";
        const content = message.content || "";
        $('.message-list').prepend($('<li>').text(`${author} : ${content}`));
    }

    onSubmitForm(e) {
        e.preventDefault();

        const author = $('.message-author-input').val();
        const content = $('.message-content-input').val();

        this.messagesRef.push({
            author: author || "名無し",
            content: content
        });

        $('.message-content-input').val('');
    }
}


$(() => {
    const messageManager = new MessageManager();
})
