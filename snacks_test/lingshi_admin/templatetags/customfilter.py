from datetime import datetime

from django import template

register = template.Library()



@register.filter(name='time_filter')
def time_filter(time):
    '''
    time 距离现在的时间间隔
    1. 如果该时间间隔现在小于1分钟，就显示刚刚
    2. 如果大于一分钟，小于1小时，就显示xx分钟以前
    3. 如果大于一小时小于24小时，就现实xx小时以前
    4. 如果大于24小时小于30天，就现实xx天以前
    5. 否则就显示具体时间
    :param time:
    :return:
    '''
    # 如果不是传入的参数不是datetime类型的数据，就直接原样返回就行了
    if isinstance(time,float):
        now = datetime.now().timestamp()
        # 得到时间差秒数
        timestam = now - time
        timestamp = round(timestam)
        print('------------',timestamp)
        if timestamp < 60:
            return "刚刚"
        elif timestamp >= 60 and timestamp < 60*60:
            minutes = int(timestamp // 60)
            return "{}分钟前".format(minutes)
        elif timestamp >= 60*60 and timestamp < 60*60*24:
            hours = int(timestamp // (60*60))
            return "{}小时前".format(hours)
        elif timestamp >= 60*60*24 and timestamp < 60*60*24*30:
            days = int(timestamp // (60*60*24))
            return "{}天前".format(days)
        elif timestamp >= 60*60*24*30 and timestamp < 60*60*24*365:
            days = int(timestamp // (60*60*24*30))
            return "{}月前".format(days)
        else:
            return time.strftime("%Y-%m-%d %H:%M")
    else:
        return time
