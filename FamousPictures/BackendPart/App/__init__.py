from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config.from_object('App.setting')
    app.config.from_object('App.secure')

    register_blueprint(app)
    return app


def register_blueprint(app):
    from App.api.v1 import v1
    from App.api.v1.img import img

    app.register_blueprint(v1, url_prefix='/api/v1')
    app.register_blueprint(img, url_prefix='/api/v1/img')

if __name__ == '__main__':
    create_app()
