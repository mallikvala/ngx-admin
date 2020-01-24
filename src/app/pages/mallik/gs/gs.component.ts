import { Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnDestroy, OnInit } from '@angular/core';
import GSTC from "gantt-schedule-timeline-calendar/dist/index.esm.js";
import plugins from "gantt-schedule-timeline-calendar/dist/plugins.js";
const { CalendarScroll, ItemHold, ItemMovement, Selection } = plugins;


@Component({
  selector: 'gschedule',
  templateUrl: './gs.component.html',
  styleUrls: ['./gs.component.scss']
})
export class GsComponent  implements OnInit {
  
  title: string = "Nursing Assignment";
  
  constructor() { }

  @ViewChild('appgantt', { read: ElementRef, static: true }) appgantt: ElementRef;
  ngOnInit() {
    const iterations = 10;

      const pallete = [
        '#E74C3C',
        '#DA3C78',
        '#7E349D',
        '#0077C0',
        '#07ABA0',
        '#0EAC51',
        '#F1892D',
        '#E3724B',
        '#AE7C5B',
        '#6C7A89',
        '#758586',
        '#707070'
      ];

      const rows = {};
      for (let i = 0; i < iterations; i++) {
        const withParent = i > 0 && i % 2 === 0;
        const id = i.toString();
        rows[id] = {
          id,
          label: `row id: ${id}`,
          progress: 50,
          parentId: withParent ? (i - 1).toString() : undefined,
          expanded: false
        };
      }

      const startDate = GSTC.api
        .date()
        .subtract(1, 'month')
        .valueOf();

      const items = {};
      for (let i = 0; i < iterations; i++) {
        const id = i.toString();
        let startDayjs = GSTC.api
          .date(startDate)
          .startOf('day')
          .add(Math.floor(Math.random() * 100), 'days');
        items[id] = {
          id,
          label: 'item id ' + i,
          time: {
            start: startDayjs.valueOf(),
            end: startDayjs
              .clone()
              .add(Math.floor(Math.random() * 6) + 4, 'days')
              .valueOf()
          },
          progress: 50,
          rowId: id,
          lines: i > 0 && i % 2 === 0 ? [(i + 1).toString()] : [],
          style: { background: pallete[Math.floor(Math.random() * pallete.length)] }
        };
      }

      const columns = {
        percent: 100,
        resizer: {
          inRealTime: true
        },
        data: {
          id: {
            id: 'id',
            data: 'id',
            width: 50,
            header: {
              content: 'ID'
            }
          },
          label: {
            id: 'label',
            data: 'label',
            expander: true,
            isHTML: false,
            width: 230,
            header: {
              content: 'Label'
            }
          },
          progress: {
            id: 'progress',
            data: 'progress',
            width: 30,
            header: {
              content: '%'
            }
          }
        }
      };
      let selectionApi;
      const config = {
        plugins: [
          ItemMovement({
            moveable: false,
            resizeable: true,
            collisionDetection: false
          }),
          Selection(),
          CalendarScroll({ speed: 2 })
        ],
        height: 822,
        list: {
          rows,
          columns
        },
        chart: {
          items,
          time: {
            period: 'day'
          }
        },
        classNames: {},
        actions: {}
        /*locale: {
          name: 'pl',
          weekdays: 'Niedziela_Poniedziałek_Wtorek_Środa_Czwartek_Piątek_Sobota'.split('_'),
          weekdaysShort: 'Ndz_Pon_Wt_Śr_Czw_Pt_Sob'.split('_'),
          weekdaysMin: 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
          months: 'Styczeń_Luty_Marzec_Kwiecień_Maj_Czerwiec_Lipiec_Sierpień_Wrzesień_Październik_Listopad_Grudzień'.split(
            '_'
          ),
          monthsShort: 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
          weekStart: 1
        }*/
      };

      let GSTCState = GSTC.api.stateFromConfig(config);

      // const elementz = this.appgantt.nativeElement;
      // console.log(elementz);
      

      const app = GSTC({
        element: document.getElementById('appgantt'),
        state: GSTCState
      });
  }


}
