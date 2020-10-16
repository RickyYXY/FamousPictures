from flask import Blueprint

# 定义蓝图
img = Blueprint('img', __name__)

from App.api.v1.img import styilze

@img.route('/')
def say_hello():
    return "这里是图片类接口"

