# coding=utf-8
'''
  Created by lyy on 2019-04-19
'''
import datetime
import os

from flask import request, jsonify

from App.api.v1.img import img
from App.model.res import Res
from App.utils.common_utils import get_date_now
from App.utils.stylize.create_stylize_photo import change_style

__author__ = 'lyy'

path = os.getcwd() + '/app/utils/stylize'


@img.route('/stylize/create', methods=['POST'])
def create_style_changed_img():
    start = datetime.datetime.now()

    img = request.files.get('img')
    type = request.form.get('type')

    img.save(path + '/temp/' + 'temp.jpg')

    img_url = change_style(int(type))

    end = datetime.datetime.now()

    status = 200
    msg = '图片生成成功'
    info = [
        {
            'img_url': img_url,
            'created_time': get_date_now(),
            'finish_time': (end - start).seconds
        }
    ]

    res_json = Res(status, msg, info)

    return jsonify(res_json.__dict__)
