import os
from datetime import datetime
from random import randint

from snacks_test.settings import MEDIA_ROOTS

pic = '31.jpg'
def route(pic):
    # 允许上传的文件后缀
    ALLOWED_FILEEXTS = ['.png', '.jpeg', '.jpg', '.gif', '.bmp','.jfif']
    path = os.path.join(MEDIA_ROOTS, pic.name)
    # print('------',path)
    # 文件类型过滤
    ext = os.path.splitext(pic.name)
    print(ext)
    if len(ext) < 1 or not ext[1] in ALLOWED_FILEEXTS:

        path = False
        return path

    # 解决文件重名
    if not os.path.exists(path):
        # 日期目录
        dir = datetime.today().strftime("%Y/%m/%d")
        dir = os.path.join(MEDIA_ROOTS, dir)
        if not os.path.exists(dir):
            os.makedirs(dir)  # 递归创建目录

        # list.png
        file_name = ext[0] + datetime.today().strftime("%Y%m%d%H%M%S") + str(randint(1, 1000)) + ext[1] if len(ext) > 1 else ''
        path = os.path.join(dir, file_name)
        # print('aaaaaaaaa')
        return path
    return path
# a = route(pic)
# print(a)

def upload_files(pic,path):
    # 创建新文件
    with open(path, 'wb') as fp:
        # 如果文件超过2.5M,则分块读写
        if pic.multiple_chunks():
            for block1 in pic.chunks():
               fp.write(block1)
        else:
            fp.write(pic.read())

    result = True
    return result



