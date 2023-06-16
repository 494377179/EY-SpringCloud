<template>
  <div class="vmMonitor-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card shadow="hover">
          <div slot="header" class="card-header"><span>虚拟机使用率情况</span></div>
          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="vmUseRate"
            class="chart-area" 
            @click="onClick"
          />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card shadow="hover">
          <div slot="header" class="card-header"><span>虚拟机使用率详情-{{vmIp}}</span></div>
          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="vmUseRateDetail"
            class="chart-area" 
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VabChart from '@/plugins/echarts'

let vmUseRateOption = {
        title: {
          /**text: '柱状图堆叠'**/
        },
        //color: ['rgb(53,152,254)','rgb(255,165,0)', 'rgb(255,0,0)'],
        //color: [new graphic.LinearGradient(0,0,1,0,[{offset: 0,color: "#90BEFF"},{offset: 1,color: "#5EA1FF"}],false),new graphic.LinearGradient(0,0,1,0,[{offset: 0,color: "#FFF0A0"},{offset: 1,color: "#FFD355"}],false), new graphic.LinearGradient(0,0,1,0,[{offset: 0,color: "#FFABAC"},{offset: 1,color: "#FF6772"}],false)],
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br/>{a}: {c}%<br/>{a1}: {c1}%<br/>{a2}: {c2}%',
        },
        legend: {
          data: ['CPU', '内存', '硬盘'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            interval: 0,
            rotate: 50, //倾斜度 -90 至 90 默认为0
            margin: 10,
            fontSize: '10',
            show: true,
            textStyle: {
              color: '#000000',
            },
          },
          data: [],
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: true,
            inside: true,
          },
          axisLine: {
            // 坐标轴刻度相关设置。
            show: true,
            //alignWithLabel: false ,// 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐。
            //interval: 'auto' , // 坐标轴刻度的显示间隔，在类目轴中有效。默认同 axisLabel.interval 一样。
            //inside: true, // 坐标轴刻度是否朝内，默认朝外。
            //length: 5 , // 坐标轴刻度的长度。
            lineStyle: {
              // 刻度线的样式设置。
              color: '#000', // 刻度线的颜色，默认取 axisTick.lineStyle.color。
              width: 1,
              type: 'solid', // (实线：'solid'，虚线：'dashed'，星罗棋布的：'dotted')
              //shadowColor: 'rgba(0, 0, 0, 0.5)',
              //shadowBlur: 10,
              //shadowOffsetX: 0 ,
              //shadowOffsetY: 0 ,
              //opacity: 1
            },
          },
        },
        series: [
          {
            name: 'CPU',
            type: 'bar',
            //stack: '总量',
            //barWidth:10,
            data: [],
          },
          {
            name: '内存',
            type: 'bar',
            //stack: '总量',
            //barWidth:10,
            data: [],
          },
          {
            name: '硬盘',
            type: 'bar',
            //stack: '总量',
            //barWidth:10,
            data: [],
          },
        ],
}

let vmUseRateDetailOption = {
  title: {
        /**text: '柱状图堆叠'**/
    },
    //color: ['rgb(53,152,254)','rgb(255,165,0)', 'rgb(255,0,0)'],
    //color: [new echarts.graphic.LinearGradient(0,0,1,0,[{offset: 0,color: "#90BEFF"},{offset: 1,color: "#5EA1FF"}],false),new echarts.graphic.LinearGradient(0,0,1,0,[{offset: 0,color: "#FFF0A0"},{offset: 1,color: "#FFD355"}],false), new echarts.graphic.LinearGradient(0,0,1,0,[{offset: 0,color: "#FFABAC"},{offset: 1,color: "#FF6772"}],false)],
    tooltip: {
        trigger: 'axis',
        formatter: '{b}<br/>{a}: {c}%<br/>{a1}: {c1}%<br/>{a2}: {c2}%'
    },
    legend: {
        data: ['CPU', '内存', '硬盘']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: true,
        axisTick: {
            alignWithLabel: true
        },
        axisLabel:{
            interval:0,
            fontSize:'12',
            show:true,
            textStyle:{
                color:"#000000"
            }
        },
        data: []
    },
    yAxis: {
        type: 'value',
        axisTick: {
            show: true,
            inside: true,
        },
        axisLine: { // 坐标轴刻度相关设置。
            show: true,
            //alignWithLabel: false ,// 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐。
            //interval: 'auto' , // 坐标轴刻度的显示间隔，在类目轴中有效。默认同 axisLabel.interval 一样。
            //inside: true, // 坐标轴刻度是否朝内，默认朝外。
            //length: 5 , // 坐标轴刻度的长度。
            lineStyle: { // 刻度线的样式设置。
                color: "#000", // 刻度线的颜色，默认取 axisTick.lineStyle.color。
                width: 1,
                type: 'solid', // (实线：'solid'，虚线：'dashed'，星罗棋布的：'dotted')
                //shadowColor: 'rgba(0, 0, 0, 0.5)',
                //shadowBlur: 10,
                //shadowOffsetX: 0 ,
                //shadowOffsetY: 0 ,
                //opacity: 1
            }
        }
    },
    series: [
        {
            name: 'CPU',
            type: 'line',
            //stack: '总量',
            //barWidth:10,
            data: []
        },
        {
            name: '内存',
            type: 'line',
            //stack: '总量',
            //barWidth:10,
            data: []
        },
        {
            name: '硬盘',
            type: 'line',
            //stack: '总量',
            //barWidth:10,
            data: []
        }
    ],
}

export default {
  name: 'VmMonitor',
  components: {
    VabChart,
  },
  data() {
    return {
      vmUseRate: vmUseRateOption,
      vmUseRateDetail: vmUseRateDetailOption,
      vmIp:'172.30.128.113'
    }
  },
  mounted() {
    this.vmUseRate.xAxis.data = ['172.30.128.113', '172.30.128.121', '172.30.128.13', '172.30.128.177',
            '172.30.128.193', '172.30.128.238', '172.30.128.5','172.30.128.89', '172.30.145.10',
            '172.30.145.12','172.30.145.13', '172.30.145.14', '172.30.145.15', '172.30.145.18',
            '172.30.145.19', '172.30.145.21', '172.30.145.22','172.30.145.23', '172.30.145.24',
            '172.30.145.25','172.30.145.26', '172.30.145.27', '172.30.145.28', '172.30.145.29',
            '172.30.145.3', '172.30.145.30', '172.30.145.34','172.30.145.39', '172.30.145.4',
            '172.30.145.42','172.30.145.48', '172.30.145.6', '172.30.197.147', '172.30.197.155',
            '172.30.197.161', '172.30.197.163', '172.30.197.167','172.30.197.173', '172.30.197.177',
            '172.30.197.182','172.30.197.195','172.30.197.196','172.30.197.197','172.30.197.213',
            '172.30.197.216','172.30.197.239','172.30.197.240','172.30.197.242','172.30.197.249',
            '172.30.197.146']
    this.vmUseRate.series[0].data=[10, 30, 50, 80, 30, 20, 90,70,30,50,10, 30, 50, 80, 30, 20, 90,70,30,50,10, 30, 50, 80, 30, 20, 90,70,30,50,10, 30, 50, 80, 30, 20, 90,70,30,50,10, 30, 50, 80, 30, 20, 90,70,30,50]  
    this.vmUseRate.series[1].data=[40, 30, 50, 60, 30, 20, 60,70,30,50,40, 30, 50, 60, 30, 20, 60,70,30,50,40, 30, 50, 60, 30, 20, 60,70,30,50,40, 30, 50, 60, 30, 20, 60,70,30,50,10, 30, 50, 80, 30, 20, 90,70,30,50]
    this.vmUseRate.series[2].data=[70, 50, 40, 20, 30, 20, 80,70,30,50,70, 50, 40, 20, 30, 20, 80,70,30,50,70, 50, 40, 20, 30, 20, 80,70,30,50,70, 50, 40, 20, 30, 20, 80,70,30,50,10, 30, 50, 80, 30, 20, 90,70,30,50]

    this.vmUseRateDetail.xAxis.data = ['01-04','01-05','01-06','01-07','01-08','01-09','01-10']
    this.vmUseRateDetail.series[0].data = [10,40,30,56,77,90,68]
    this.vmUseRateDetail.series[1].data = [40,30,56,44,79,69,88]
    this.vmUseRateDetail.series[2].data = [70,40,56,77,45,90,40]
      //this.fwl.xAxis[0].data = date
      //this.fwl.series[0].data = data
      //this.timer = setInterval(() => {
        //this.fwl.xAxis[0].data = date
        //this.fwl.series[0].data = data
      //}, 3000)
  },
  methods: {
    onClick(params) {
        this.vmIp = params.name
        this.vmUseRateDetail.series[0].data = this.getSeriesData()
        this.vmUseRateDetail.series[1].data = this.getSeriesData()
        this.vmUseRateDetail.series[2].data = this.getSeriesData()
    },
    getSeriesData(){
        //根据js方法本身的加载顺序，此方法需要定义在myChart前面
        //此处可以通过后台生成数据，这样后台就无需返回整个option，只需要返回动态的数据部分即可
        // $.ajax({
        //     type: 'GET',
        //     url: "getSeriesData",
        //     cache: false,
        //     async : false,
        //     dataType: 'json',
        //     success: function (result) {
        //         seriesdata = result;
        //     },
        //     error: function (result, XMLHttpRequest, textStatus, errorThrown) {
        //         // 状态码
        //         // console.log(XMLHttpRequest.status);
        //         // console.log(XMLHttpRequest.toLocaleString());
        //         // 状态
        //         // console.log(XMLHttpRequest.readyState);
        //         // 错误信息
        //         // console.log(textStatus);
        //     }
        // });

        var n1 = Math.floor(Math.random()*100+1);
        var n2 = Math.floor(Math.random()*100+1);
        var n3 = Math.floor(Math.random()*100+1);
        var n4 = Math.floor(Math.random()*100+1);
        var n5 = Math.floor(Math.random()*100+1);
        var n6 = Math.floor(Math.random()*100+1);
        var n7 = Math.floor(Math.random()*100+1);
        var seriesdata = [n1, n2, n3, n4, n5, n6, n7];
        return seriesdata;
    }
  },
}
</script>

<style lang="scss" scoped>
.chart-area {
  position: relative;
  height: 20rem;
  width: 100%;
}
</style>
