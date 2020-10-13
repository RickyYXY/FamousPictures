from App import create_app

app = create_app()

@app.route('/')
def hello():
    return 'hello,flask'


if __name__ == "__main__":
    app.run(port=8080, debug=True)
