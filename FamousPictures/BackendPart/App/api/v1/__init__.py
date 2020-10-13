from flask import Blueprint

# 定义一个蓝图
v1 = Blueprint('v1', __name__)

from App.api.v1.img import img