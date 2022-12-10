import {Injectable} from '@angular/core';
import {ToolService as CoreToolService} from "@myvirtualab.angular/core";

@Injectable({
  providedIn: 'root'
})
export class ToolService extends  CoreToolService{

 replaceAll(str: string, term: string, replacement: string): string {
   return super.replaceAll(str, term, replacement);
 }
 linkNavigateTo(link: string, method: "_top" | "_blank") {
   super.linkNavigateTo(link, method);
 }
 isnull(value: any, replace?: any): any {
   return super.isnull(value, replace);
 }
 isApp(): boolean {
   return super.isApp();
 }
 isBrowser(): boolean {
   return super.isBrowser();
 }
 isDesktop(): boolean {
   return super.isDesktop();
 }

 shuffleArray(arr: any[]): any[] {
   return super.shuffleArray(arr);
 }

 getBrowserResolution(): { width: number; height: number } {
   return super.getBrowserResolution();
 }

  localIPAddress = super.localIPAddress

}
