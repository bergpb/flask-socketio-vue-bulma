from random import randint
from flask import Flask, render_template
from flask_socketio import SocketIO, emit

# initialize Flask
app = Flask(__name__)
socketio = SocketIO(app)


@app.route('/')
def index():
    """Serve the index HTML"""
    return render_template('index.html', value=randint(0, 100))


@socketio.on('update')
def on_update(data):
    """Update content in page"""
    print(data['msg'])
    emit('updated', {'msg': randint(0, 100)})


if __name__ == '__main__':
    socketio.run(app, debug=True)
