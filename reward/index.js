/*<!--Python Code Here

#等级奖励机制

import random
import time
import os
import sys
import math

ratio = 100
u=9/10

def get_upgrade_need_exp_first_day_of(level):
    return (level+1)**u

def get_upgrade_need_exp_of_day_of_level(level,day):
    #以get_upgrade_need_exp_first_day_of(level)为底，day为真数
    #return 
    return math.atan(day)*get_upgrade_need_exp_first_day_of(level)*math.log(day+1, 1+1/get_upgrade_need_exp_first_day_of(level))*ratio

def exp_get(level,day,coef_difficulty_complex,mission_diff):
    #return get_upgrade_need_exp_of_day_of_level(level,1)*day*day/(day*day+1)#day*day/(day*day+1) is the ratio of the exp of the day to the exp of the first day 
    main_val = get_upgrade_need_exp_of_day_of_level(level,1)*0.85*day/(day+1)
    coef_day = 1.3+0.2*math.atan(7-abs(1.5*(day-7)))
    coef_difficulty = 0.8+int(mission_diff)*0.1
    return coef_day*main_val*coef_difficulty_complex*coef_difficulty

#模拟开始游戏
my_input = ""
difficulty_coefficient=0#defined by the difficulty of the mission

def check_upgrade():
    global my_exp
    global level
    global day
    if(my_exp >= get_upgrade_need_exp_of_day_of_level(level,day)):
        my_exp -= get_upgrade_need_exp_of_day_of_level(level,day)
        day = 0
        level += 1
        print(f"恭喜您升级到{level}级")

def plan():
        global mission
        global difficulty_coefficient
        mission = input('当前无任务,请定义难度 >').split(" ")
        difficulty_coefficient = 0.7+0.033/(1+0.5*abs(mission.count("3")-2))+0.033/(1+0.5*abs(mission.count("2")-3))+0.033/(1+0.5*abs(mission.count("1")-2))#最佳总共7个任务，2个hard,3个normal,2个easy
#initialize
day = 0
level = 1
my_exp = 0
mission = []#the difficulty of the mission,1:easy,2:normal,3:hard,4:tough

print("游戏开始,输入exit退出")

while(not my_input == "exit"):
    day += 1
    for i in range(0, 2):#每日最多完成2个任务
        if(day == 0):
            day = 1
        if(mission == [] or mission == None):
            plan()
        my_input = input(f"第{day}天,等级{level},经验值{my_exp}/{get_upgrade_need_exp_of_day_of_level(level,day)},当前任务难度:\nEasy:{mission.count("1")}个\t{exp_get(level,day,difficulty_coefficient,1)}\nNormal:{mission.count("2")}个\t{exp_get(level,day,difficulty_coefficient,2)}\nHard:{mission.count("3")}个\t{exp_get(level,day,difficulty_coefficient,3)}\nTough:{mission.count("4")}个\t{exp_get(level,day,difficulty_coefficient,4)}\n完成？(1/2/3/4/n) >")
        if(my_input == "n"):
            break
        e = exp_get(level,day,difficulty_coefficient,my_input)
        mission.remove(my_input)
        print(f"获得{e}经验值")
        my_exp += e
        check_upgrade()



    print("\n")


# 1 1 2 2 2 3 3 3 3
# 236.7422872693619--> */

// Path: index.js

//初始化Leancloud
// 使用 localStorage 作为存储适配器
const storageAdapter = {
  async getItemAsync(key) {
    return localStorage.getItem(key);
  },
  async setItemAsync(key, value) {
    return localStorage.setItem(key, value);
  },
  async removeItemAsync(key) {
    return localStorage.removeItem(key);
  },
};


const APP_ID = 'qwUdSwIm8YI1ilHhjiqIkGap-gzGzoHsz';
const APP_KEY = 'ToJcW1bIMIeMc0ZQ4fYzoMIa';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
  serverURL: 'https://y-fr.github.io',
  storage: storageAdapter, // 配置存储适配器
});

getDatabase();

//获取数据库函数
function getDatabase(){
    const query = new AV.Query('RewardDataBase');
    query.descending('createdAt'); // 按照时间戳倒序排列
    query.limit(1); // 限制查询结果数量为1
    query.find().then((results) => {
      if (results.length > 0) {
        const latestData = results[0];
        console.log('最新的一行数据：', latestData.toJSON());
      } else {
        console.log('未找到数据。');
      }
    }).catch((error) => {
      console.error('查询失败：', error);
    });
    
}


