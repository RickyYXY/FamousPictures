import os

from PIL import Image

from App.utils.common_utils import upload_pic_to_qiniu, get_ran_dom
from App.utils.stylize.evaluate import ffwd_to_img

path = os.getcwd() + '/app/utils/stylize'

# 已经训练好的模型的路径
trained_models_path = path + '/trained_model/'

# 内容图路径
content_image = path + '/temp/' + 'temp.jpg'


# 压缩图片
def compress_image():
    im = Image.open(content_image)
    if content_image.endswith(".png"):
        im = im.convert('P')
    im.save(content_image, optimize=True)


def change_style(image_style):
    # 在对图片处理之前先进行一次压缩操作
    compress_image()

    style_list = ['la_muse', 'rain_princess', 'scream', 'udnie', 'wave', 'wreck']
    style = style_list[int(image_style)]

    # 模型的 checkpoint 的位置
    check_point_dir = trained_models_path + style + '.ckpt'

    # 最终生成的图片路径
    result_image = path + '/output/' + 'output.jpg'

    # 最终生成的图片名称
    filename = 'output' + '_' + get_ran_dom() + '.jpg'

    # 执行生成图片的操作
    ffwd_to_img(content_image, result_image, check_point_dir)

    img_url = upload_pic_to_qiniu(filename, result_image)

    return img_url


if __name__ == '__main__':
    change_style(2)