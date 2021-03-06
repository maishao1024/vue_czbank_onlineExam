import Vue from 'vue'
import Router from 'vue-router'
import login from '@/containers/login/login'
import main from '@/containers/main/main'
import changePass from '@/containers/main/personalCenter/changePass'
import homepage from '@/containers/main/homepage/index'
import information from '@/containers/main/information/informationView'
import examCard from '@/containers/main/examCard/index'
import achievement from '@/containers/main/achievement/achievementView'
import showChart from '@/containers/main/achievement/showChart'
import checkin from '@/containers/main/checkin/checkin'
import question from '@/containers/main/question/question'
import UserManagement from '@/containers/main/UserManagement/StudentManagement'
import examManage from '@/containers/main/examManage/examManagement'
import showGrade from '@/containers/main/showGrade/showGrade'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      children: [
        {
          path: 'exam/:paperId/:questionId',
          component: examCard,
        },
        {
          path: 'homepage',
          component: homepage,
        },
        {
          path: 'personalCenter/changePass',
          name: 'changePass',
          component: changePass,
        },
        {
          path: 'information/informationView',
          name: 'informationView',
          component: information,
        },
        {
          path: 'achievement/achievementView',
          name: 'achievementView',
          component: achievement,
        },{
          path: 'achievement/showChart',
          name: 'showChart',
          component: showChart,
        },{
          path: 'checkin/checkin',
          name: 'checkin',
          component: checkin,
        },{
          path: 'question/question',
          name: 'question',
          component: question,
        },
        {
          path:'UserManagement/StudentManagement',
          name:'StudentManagement',
          component:UserManagement,
        },
        {
          path:'showGrade/showGrade',
          name:'showGrade',
          component:showGrade,
        },
        {
          path:'examManage/examManagement',
          name:'examManage',
          component:examManage,
        }
      ]
    }
  ]
})
