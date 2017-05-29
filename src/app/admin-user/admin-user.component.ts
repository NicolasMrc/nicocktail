import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/UserService";
import {AlcoholService} from "../services/AlcoholService";
import {Soft} from "../../entities/Soft";
import {SoftService} from "../services/SoftService";
import {ExtraService} from "../services/ExtraService";
import {BundleService} from "../services/BundleService";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  private datasets = [
    {data: [0,0,0,0,0,0], label: ''},
  ];

  public doughnutChartLabels = ['10 Cup Bundle', '30 Cup Bundle', '50 Cup Bundle'];
  public doughnutChartType:string = 'doughnut';

  public nbUsers;
  public nbAlcohols;
  public nbOrders = 0;
  public nbSofts;
  public nbExtras;
  public nbBundles;
  public nbBundleSold = 0;
  public nbSubscriber = 0;

  public barChartLabels:string[] = ['Blue Lagoon', 'Cosmopolitan', 'Mojito', 'Pinacolada', 'JägerBomb', 'Tequila Sunrise'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [0,0,0,0,0,0], label: 'Sold'},
  ];

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  };


  constructor(private userService : UserService, private alcoholService : AlcoholService, private softService : SoftService, private extraService : ExtraService, private bundleService : BundleService) { }

  ngOnInit() {

    let bundleData:any[] = [
      {data: [0,0,0,0,0,0], label: 'Sold'},
    ];

    let datasets = [
      {
        label: "# of Votes",
        data: [12, 19, 3]
      }
    ];

    this.userService.findAll().subscribe(users => {
      if(users != null){
        this.nbUsers = users.length;
        for(let user of users){

          if(user.orders != null){
            this.nbOrders += user.orders.length;
            for(let order of user.orders){
              for(let bundle of order.bundles){
                this.nbBundleSold ++;
                if(bundle.name == 'Blue Lagoon'){
                  bundleData[0]['data'][0] ++;
                } else if(bundle.name == 'Cosmopolitan'){
                  bundleData[0]['data'][1] ++;
                }else if(bundle.name == 'Mojito'){
                  bundleData[0]['data'][2] ++;
                }else if(bundle.name == 'Pinacolada'){
                  bundleData[0]['data'][3] ++;
                }else if(bundle.name == 'JägerBomb'){
                  bundleData[0]['data'][4] ++;
                }else if(bundle.name == 'Tequila Sunrise'){
                  bundleData[0]['data'][5] ++;
                }
              }
            }
          }
          if(user.is_subscriber != null){
            this.nbSubscriber ++;
          }
          if(user.is_subscriber == 10){
            datasets[0]['data'][0] ++;
          } else if(user.is_subscriber == 30){
            datasets[0]['data'][1] ++;
          } else if(user.is_subscriber == 50){
            datasets[0]['data'][2] ++;
          }
        }
        this.barChartData = bundleData;
        this.datasets = datasets;
      }
    });

    this.alcoholService.findAll().subscribe(alcohols => {
      this.nbAlcohols = alcohols.length;
    });
    this.extraService.findAll().subscribe(extras => {
      this.nbExtras = extras.length;
    });
    this.bundleService.findAll().subscribe(bundles => {
      this.nbBundles = bundles.length;
    });

    this.softService.findAll().subscribe(softs => {
      this.nbSofts = softs.length;
    });
  }

}
