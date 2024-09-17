export default { data() { return { StudentsPdfTemplate: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Lesepreis Rangliste {{date}}</title>
</head>
<body onload="window.print()">
    <div class="container">
        <h1 class="heading">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3NCIgaGVpZ2h0PSIyMiIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTEuNSAxNS45NWMtLjEgMC0uMjEtLjA2LS4zNS0uMTYtLjEzLS4xLS4yLS4yMS0uMi0uMzMgMC0uMTMuMTUtLjQ3LjQ1LTEuMDEuMjktLjU0Ljc2LTEuMzYgMS40LTIuNDRsMi41My00LjIzIDIuODktNC44MUEzNy44MyAzNy44MyAwIDAgMSA5LjY3LjUyYy4wOS0uMTMuMTgtLjIuMjgtLjIuMSAwIC4yLjA2LjMxLjE2LjEuMDkuMTYuMTguMTYuMjkgMCAuMDUtLjM3LjctMS4xIDEuOTUtLjc0IDEuMjQtMS44NCAzLjA4LTMuMzMgNS41M0w0LjE3IDExLjMgMi4xIDE0LjkzYzQuMjUtMS4xNCA3LjUyLTEuNzEgOS44MS0xLjcxLjcgMCAxLjI2LjEyIDEuNzIuMzUuNDcuMjIuNy40NC43LjY2IDAgLjI1LS4xMi4zNy0uMzcuMzctLjIgMC0uMzEtLjEtLjMxLS4zM3YtLjA2Yy0uMTUtLjA4LS40LS4xMy0uNzUtLjE4YTEzLjI1IDEzLjI1IDAgMCAwLTMuMS4wOSA0NC4xOSA0NC4xOSAwIDAgMC00LjE4Ljc3IDM5LjE0IDM5LjE0IDAgMCAwLTMuMjguODQgNi4xMiA2LjEyIDAgMCAwLS44My4yMlptMTYuNjYtLjU1Yy0uNjEgMC0xLjEtLjIyLTEuNDUtLjY0YTIuMzcgMi4zNyAwIDAgMS0uNTMtMS41NiA2LjEgNi4xIDAgMCAxIDEuMDYtMy4yNkE5LjE3IDkuMTcgMCAwIDEgMjAuMSA3LjFjLjQ4LS4yOC45NS0uNDIgMS40LS40Mi43NSAwIDEuMTMuMzYgMS4xMyAxLjA2IDAgLjg4LS41MSAxLjY4LTEuNTQgMi40YTUuMDIgNS4wMiAwIDAgMS0zLjI2Ljk0TDE3LjUgMTFhNS4yNSA1LjI1IDAgMCAwLS41NyAyLjIyYzAgLjk3LjQzIDEuNDUgMS4yOCAxLjQ1LjY5IDAgMS4zNC0uMTIgMS45NS0uMzVhOS41IDkuNSAwIDAgMCAyLjItMS4zOWMuNTMtLjQuOTMtLjc0IDEuMi0uOTlsLjg1LS43OWEuNDUuNDUgMCAwIDEgLjI0LS4wOWMuMDggMCAuMTUuMDIuMjIuMDcuMDguMDQuMTEuMS4xMS4yIDAgLjE2LS4xNC4zOC0uNDQuNjhsLS43OS43NWMtLjI4LjI1LS43Mi42LTEuMzIgMS4wNS0uNjQuNS0xLjM1Ljg5LTIuMTEgMS4xN2E2LjMgNi4zIDAgMCAxLTIuMTYuNDJabS0uMDItNWE0LjA5IDQuMDkgMCAwIDAgMi41NS0uODZjLjg1LS42MyAxLjI4LTEuMjIgMS4yOC0xLjc4IDAtLjI1LS4xNi0uMzctLjQ2LS4zNy0uNTkgMC0xLjI3LjM2LTIuMDUgMS4wOGE3LjQyIDcuNDIgMCAwIDAtMS42IDEuOS45LjkgMCAwIDAgLjI4LjAzWm02IDUuMzNjLS44MiAwLTEuMjMtLjI4LTEuMjMtLjgyIDAtLjM0LjExLS42Ny4zNS0xLjAxYTUuMjMgNS4yMyAwIDAgMSAyLjE3LTEuN2MuMTctLjA0LjMtLjA2LjQtLjA2LjEyIDAgLjE4LjA0LjE4LjEzIDAgLjA4LS4wOC4xNi0uMjUuMjQtLjY3LjMzLTEuMi43Mi0xLjU4IDEuMTctLjM3LjQ0LS41NS44LS41NSAxLjA4IDAgLjI2LjIzLjQuNjguNC4zOCAwIC44LS4xIDEuMjQtLjNhNS42IDUuNiAwIDAgMCAyLjI4LTEuNzNjLjI3LS4zNS40LS42OS40LTEuMDFhLjkuOSAwIDAgMC0uMjItLjYgMS4yIDEuMiAwIDAgMC0uNjYtLjRsLTEuNDUtLjQzYTEuNjkgMS42OSAwIDAgMS0uOC0uNDYuOTYuOTYgMCAwIDEtLjI0LS42NGMwLS40NC4xNi0uODQuNDktMS4xOS4zMy0uMzUuNzUtLjYzIDEuMjUtLjg0LjUtLjIuOTgtLjMgMS40NS0uM3MuODguMTEgMS4yMy4zNWMuMzYuMjIuNTMuNTIuNTMuOSAwIC4yMi0uMDYuNDMtLjIuNjItLjExLjE5LS4yNS4yOC0uNDEuMjgtLjI1IDAtLjM4LS4xLS4zOC0uMyAwLS4wOC4wNC0uMTcuMTEtLjI3YS41Ni41NiAwIDAgMCAuMTQtLjMzYzAtLjQ0LS4zNC0uNjYtMS4wMi0uNjYtLjM2IDAtLjczLjA4LTEuMS4yNC0uMzUuMTUtLjY0LjM1LS44OC42LS4yMy4yNS0uMzUuNTItLjM1LjgxIDAgLjMuMy41My44OC43bDEuNC40NGMuNDMuMTQuNzMuMzIuODkuNTUuMTYuMjIuMjQuNDcuMjQuNzUgMCAuNjYtLjQgMS4zNC0xLjIgMi4wNS0xLjMxIDEuMTYtMi41OCAxLjc0LTMuOCAxLjc0Wm04LjU3LS4zM2MtLjYyIDAtMS4xLS4yMi0xLjQ1LS42NGEyLjM3IDIuMzcgMCAwIDEtLjUzLTEuNTYgNi4xIDYuMSAwIDAgMSAxLjA1LTMuMjYgOS4xOCA5LjE4IDAgMCAxIDIuODYtMi44NGMuNDktLjI4Ljk2LS40MiAxLjQxLS40Mi43NSAwIDEuMTIuMzYgMS4xMiAxLjA2IDAgLjg4LS41MSAxLjY4LTEuNTQgMi40YTUuMDIgNS4wMiAwIDAgMS0zLjI1Ljk0bC0uMzMtLjA4YTUuMjUgNS4yNSAwIDAgMC0uNTcgMi4yMmMwIC45Ny40MiAxLjQ1IDEuMjcgMS40NS43IDAgMS4zNC0uMTIgMS45Ni0uMzVhOS41IDkuNSAwIDAgMCAyLjItMS4zOWMuNTMtLjQuOTItLjc0IDEuMTktLjk5bC44Ni0uNzlhLjQ1LjQ1IDAgMCAxIC4yNC0uMDljLjA3IDAgLjE0LjAyLjIyLjA3LjA3LjA0LjEuMS4xLjIgMCAuMTYtLjE0LjM4LS40My42OGwtLjguNzVjLS4yNy4yNS0uNzEuNi0xLjMxIDEuMDUtLjY1LjUtMS4zNS44OS0yLjEyIDEuMTdhNi4zIDYuMyAwIDAgMS0yLjE1LjQyWm0tLjAyLTVhNC4wOSA0LjA5IDAgMCAwIDIuNTUtLjg2Yy44NS0uNjMgMS4yNy0xLjIyIDEuMjctMS43OCAwLS4yNS0uMTUtLjM3LS40Ni0uMzctLjU5IDAtMS4yNy4zNi0yLjA0IDEuMDhhNy40MiA3LjQyIDAgMCAwLTEuNiAxLjkuOS45IDAgMCAwIC4yOC4wM1ptNC4zOSAxMC42N2MtLjcgMC0xLjA0LS40OS0xLjA0LTEuNDcgMC0xLjMuNTctMy4zNSAxLjctNi4xNmExOC4yNSAxOC4yNSAwIDAgMSAxLjYtMy4xIDE1Ljg1IDE1Ljg1IDAgMCAxIDEuOTEtMi43Ljk0Ljk0IDAgMCAxIC4yMy0uMTkuNS41IDAgMCAxIC4xNy0uMDRjLjM4IDAgLjgyLjExIDEuMy4zMy40OC4yMi45Mi41IDEuMy44NC4zNS4yOS42NC42NC44NiAxLjA1YTIuNjcgMi42NyAwIDAgMSAuMTMgMi4yN2MtLjEyLjMyLS4yOC42NC0uNDkuOTdhNi42MyA2LjYzIDAgMCAwIDMuMDgtMS43Mi4zMy4zMyAwIDAgMSAuMjUtLjA5Yy4yMiAwIC4zMy4wOS4zMy4yNyAwIC4wNy0uMDQuMTYtLjExLjI4LS4wNi4xLS4xNy4yNC0uMzMuNGE2LjU1IDYuNTUgMCAwIDEtMy45MiAxLjcxIDguMSA4LjEgMCAwIDEtMS41MiAxLjI2Yy0uODUuNTEtMS41Ny43Ny0yLjE4Ljc3YS44My44MyAwIDAgMS0uNjEtLjI0Ljc2Ljc2IDAgMCAxLS4yNC0uNTVjMC0uNjguNTgtMS4yIDEuNzYtMS41NC40Mi0uMTIuODUtLjIyIDEuMjctLjMxbDEuMjYtLjI5Yy4yOS0uNDUuNS0uODUuNjMtMS4xOS4xNS0uMzMuMjItLjYyLjIyLS44NSAwLS43OC0uNTgtMS41Mi0xLjczLTIuMjMtLjQ2LS4yNy0uODItLjQtMS4wOC0uNGEyMS4xNCAyMS4xNCAwIDAgMC0zLjQxIDUuNTVjLTEuMTIgMi40NS0xLjY3IDQuMzgtMS42NyA1Ljc5IDAgLjM0LjAzLjU2LjA4LjY4LjA2LjEyLjE3LjE4LjMxLjE4LjA1IDAgLjA4LS4wMS4xMS0uMDNoLjA5Yy4yIDAgLjI5LjEyLjI5LjM2IDAgLjI2LS4xOS40LS41NS40Wm0zLjQzLTYuMDNjLjU0IDAgMS4zMy0uNDIgMi4zNS0xLjI3YTkuNDQgOS40NCAwIDAgMC0xLjU4LjM1Yy0uNjYuMi0xIC40My0xIC43MyAwIC4xMy4wOC4yLjIzLjJabTUuOTIuNTFjLS4yMyAwLS4zNS0uMS0uMzUtLjI5IDAtLjA4LjAyLS4xNy4wNi0uMjZsLjE0LS4yMiAyLTQuMDVjLjg1LTEuNzMgMS4yNy0yLjY5IDEuMjctMi44OCAwLS4yLjEtLjMuMzEtLjMuMjggMCAuNDIuMTMuNDIuNDEgMCAuMTUtLjA3LjM4LS4yLjdhMjQuMTUgMjQuMTUgMCAwIDEtMS4zOSAyLjg4IDI1Ljc3IDI1Ljc3IDAgMCAxIDIuNzMtMi43NGMxLjQtMS4yMiAyLjQ3LTEuODMgMy4yMi0xLjgzLjUxIDAgLjc3LjI0Ljc3LjczIDAgLjQ3LS4xNi43LS40Ny43LS4xNCAwLS4yNS0uMTItLjMzLS4zNy0uMDQtLjE4LS4xNC0uMjctLjMtLjI3LS4yNSAwLS43NC4yNy0xLjQ2LjgyYTIxLjU5IDIxLjU5IDAgMCAwLTQuOTIgNS4xN2wtMS4xIDEuNTRhMSAxIDAgMCAxLS4xOC4xN2MtLjA0LjA2LS4xMi4wOS0uMjIuMDlabTEwLjA0LS4xNWMtLjYyIDAtMS4xLS4yMi0xLjQ1LS42NGEyLjM3IDIuMzcgMCAwIDEtLjUzLTEuNTYgNi4xIDYuMSAwIDAgMSAxLjA2LTMuMjZBOS4yIDkuMiAwIDAgMSA1OC40IDcuMWMuNDgtLjI4Ljk1LS40MiAxLjQtLjQyLjc1IDAgMS4xMy4zNiAxLjEzIDEuMDYgMCAuODgtLjUyIDEuNjgtMS41NCAyLjRhNS4wMiA1LjAyIDAgMCAxLTMuMjYuOTRMNTUuOCAxMWE1LjI3IDUuMjcgMCAwIDAtLjU3IDIuMjJjMCAuOTcuNDIgMS40NSAxLjI3IDEuNDUuNyAwIDEuMzUtLjEyIDEuOTYtLjM1YTkuNSA5LjUgMCAwIDAgMi4yLTEuMzljLjUzLS40LjkzLS43NCAxLjE5LS45OWwuODYtLjc5YS40NS40NSAwIDAgMSAuMjQtLjA5Yy4wNyAwIC4xNS4wMi4yMi4wNy4wNy4wNC4xLjEuMS4yIDAgLjE2LS4xNC4zOC0uNDMuNjhsLS44Ljc1Yy0uMjcuMjUtLjcxLjYtMS4zMSAxLjA1LS42NS41LTEuMzUuODktMi4xMSAxLjE3YTYuMyA2LjMgMCAwIDEtMi4xNi40MlptLS4wMi01QTQuMDkgNC4wOSAwIDAgMCA1OSA5LjU0Yy44NS0uNjMgMS4yOC0xLjIyIDEuMjgtMS43OCAwLS4yNS0uMTYtLjM3LS40Ny0uMzctLjU4IDAtMS4yNy4zNi0yLjA0IDEuMDhhNy40NCA3LjQ0IDAgMCAwLTEuNiAxLjkuOS45IDAgMCAwIC4yOC4wM1ptMTAuMjgtNC4wN2MtLjI1IDAtLjM3LS4xMi0uMzctLjM3IDAtLjA4LjA1LS4yLjE1LS40YTYuNiA2LjYgMCAwIDEgLjY2LTEuMDNjLjI1LS4yOC40NC0uNDYuNTgtLjUzYS45LjkgMCAwIDEgLjQtLjExYy4zIDAgLjQ1LjE0LjQ1LjQyIDAgLjEtLjA2LjIzLS4yLjM3YTIuNiAyLjYgMCAwIDEtLjQxLjM4Yy0uMjQuMTQtLjM4LjI2LS40NC4zNWwtLjQ5LjY4YS4zOS4zOSAwIDAgMS0uMS4xOGMtLjA1LjA0LS4xMi4wNi0uMjMuMDZaTTYzIDE1LjI0Yy0uNCAwLS43LS4wOC0uOS0uMjQtLjE3LS4xNi0uMjYtLjQtLjI2LS43MyAwLS4zLjEtLjcyLjI4LTEuMjVhMTcuNzggMTcuNzggMCAwIDEgMi42Ny00Ljg2Yy4zMi0uMzcuNTctLjU1Ljc3LS41NS4yNiAwIC40LjEyLjQuMzUgMCAuMTUtLjEzLjQzLS4zOC44NC0uMjUuNC0uNTIuODMtLjgyIDEuMjdhMTQyLjYgMTQyLjYgMCAwIDEtMS40NSAxLjk0Yy0uMTUuMjItLjMuNTgtLjQ2IDEuMDgtLjE4LjUtLjI2Ljg4LS4yNiAxLjE0IDAgLjEyLjAyLjIuMDYuMjYuMDYuMDYuMTguMS4zOC4xLjM2IDAgLjc3LS4xMyAxLjIzLS4zNi40NS0uMjMuOTEtLjUzIDEuMzgtLjg4YTUxLjY4IDUxLjY4IDAgMCAwIDIuNC0yLjExYy4wNi0uMDYuMTUtLjA5LjI3LS4wOS4yMiAwIC4zMy4wOS4zMy4yNnMtLjEuMzUtLjMxLjU1Yy0uNC40LS43Ny43NS0xLjEgMS4wNmExMS4zNiAxMS4zNiAwIDAgMS0yLjU3IDEuNzhjLS42LjMtMS4xNC40NC0xLjY2LjQ0Wm00LjgyLjQ5Yy0uODIgMC0xLjIzLS4yOC0xLjIzLS44MiAwLS4zNC4xMi0uNjcuMzUtMS4wMWE1LjIzIDUuMjMgMCAwIDEgMi4xOC0xLjdjLjE2LS4wNC4zLS4wNi40LS4wNi4xMiAwIC4xNy4wNC4xNy4xMyAwIC4wOC0uMDguMTYtLjI0LjI0LS42Ny4zMy0xLjIuNzItMS41OCAxLjE3LS4zNy40NC0uNTUuOC0uNTUgMS4wOCAwIC4yNi4yMy40LjY4LjQuMzggMCAuOC0uMSAxLjIzLS4zYTUuNiA1LjYgMCAwIDAgMi4zLTEuNzNjLjI1LS4zNS4zOS0uNjkuMzktMS4wMWEuOS45IDAgMCAwLS4yMi0uNiAxLjIgMS4yIDAgMCAwLS42Ni0uNGwtMS40Ni0uNDNhMS42OSAxLjY5IDAgMCAxLS43OS0uNDYuOTYuOTYgMCAwIDEtLjI0LS42NGMwLS40NC4xNi0uODQuNDgtMS4xOS4zNC0uMzUuNzYtLjYzIDEuMjYtLjg0LjUtLjIuOTgtLjMgMS40NS0uM3MuODguMTEgMS4yMy4zNWMuMzUuMjIuNTMuNTIuNTMuOSAwIC4yMi0uMDcuNDMtLjIuNjItLjExLjE5LS4yNS4yOC0uNDIuMjgtLjI0IDAtLjM3LS4xLS4zNy0uMyAwLS4wOC4wNC0uMTcuMTEtLjI3YS41Ni41NiAwIDAgMCAuMTMtLjMzYzAtLjQ0LS4zMy0uNjYtMS0uNjYtLjM4IDAtLjc0LjA4LTEuMS4yNC0uMzYuMTUtLjY1LjM1LS44OS42LS4yMy4yNS0uMzUuNTItLjM1LjgxIDAgLjMuMy41My44OC43bDEuNC40NGMuNDMuMTQuNzMuMzIuODkuNTUuMTYuMjIuMjQuNDcuMjQuNzUgMCAuNjYtLjQgMS4zNC0xLjIxIDIuMDUtMS4zIDEuMTYtMi41NyAxLjc0LTMuNzkgMS43NFoiLz48L3N2Zz4=">
        </h1>
        <h2 class="heading">{{ year }}</h2>
        <table>
            <tr class="header">
                <th>
                    Name
                </th>
                <th>
                    Klasse
                </th>
                <th>
                    Multipliziert
                </th>
                <th>
                    Qualifiziert
                </th>
                <th>
                    Bücher gelesen
                </th>
                <th>
                    Lose
                </th>
            </tr>
            {{#each users}}
            <tr class="student">
                <th>
                    {{this.surname}} {{this.name}}
                </th>
                <th>
                    {{this.class}}
                </th>
                <th>
                    {{#ifCond this.multiplied_book_1 '!=' -1}}
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.25 17.5L10.4831 20.6748C10.9118 20.9963 11.5177 20.9228 11.857 20.5081L22.5 7.5" stroke="#008A06" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    {{/ifCond}}
                    {{#ifCond this.multiplied_book_1 '==' -1}}
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.5 7.5L7.5 22.5" stroke="#D90000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.5 7.5L22.5 22.5" stroke="#D90000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {{/ifCond}}
                </th>
                <th>
                    {{#ifCond this.passed_count '>=' 3}}
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.25 17.5L10.4831 20.6748C10.9118 20.9963 11.5177 20.9228 11.857 20.5081L22.5 7.5" stroke="#008A06" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    {{/ifCond}}
                    {{#ifCond this.passed_count '<' 3}}
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.5 7.5L7.5 22.5" stroke="#D90000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.5 7.5L22.5 22.5" stroke="#D90000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {{/ifCond}}
                </th>
                <th> 
                    <div style="width:1cm;display:flex;justify-content:space-between;column-gap:2px;margin:auto">
                        {{this.book_count}}
                    </div>
                </th>
                <th>
                    {{#ifCond this.points '==' undefined}}
                    0
                    {{/ifCond}}
                    {{this.points}}
                </th>
            </tr>
            {{/each}}
            <tr class="footer">
                <th>
                    Summe Lose:
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>
                    {{sum}}
                </th>
            </tr>
        </table>
        
        <p class="date-updated">Stand vom {{date}}</p>
    </div>
    <p class="info-message">generiert im Programm "Lesepreis Verwaltung" {{version}} von Serafim Thaler, David Mairhofer &amp; Elias Walter Ebner</p>

    <style>
        * {
            font-size: 3.1mm;
            font-family: sans-serif;
        }

        .student {
            height: 8mm;
        }
        
        tr.header, tr.footer {
            height: 9mm;
        }
        
        tr:nth-child(odd) {
            background-color: rgba(50, 50, 50, 0.1)
        }

        .header th, .student th {
            margin: 0;
            font-weight: lighter;
        }
        
        tr > th:nth-child(1) {
            text-align: left;
        }
        
        th {
            padding: 0 4mm;
            line-height: 100%;
            vertical-align: middle;
        }
        
        .header th {
            font-weight: bold;
        }
        
        .footer th {
            padding-top: 1.4mm;
        }
        
        svg {
            vertical-align: middle;
            height: 6mm;
        }
        
        tr:nth-child(1) {
            border-bottom: 1px solid black;
        }

        .student tr:nth-child(-n+3) {
            background-color: rgba(0, 150, 0, 0.1);
        }
        
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 4mm auto;
            border-radius: 2mm;
            overflow: hidden;
        }
        
        .heading {
            text-align: center;
            width: 100%;
            margin: auto;
        }
        
        h1.heading img {
            height: 14mm;
            width: auto;
        }
        
        h2.heading {
            font-size: 4.1mm;
            font-weight: lighter;
            margin: 1mm auto 6mm auto;
        }
        
        .date-updated {
            /* position: absolute; */
            width: 100%;
            margin: 9mm auto 0 auto;
            padding: 0;
            bottom: 2.7mm;
            text-align: center;
        }
        
        body, html {
            height: 297mm;
            position: relative;
            width: 213mm;
            margin: 0;
        }

        body {
            display: grid;
            grid-template-rows: 1fr 7mm;
        }

        div .container {
            width: 100%;
            height: 100%;
        }

        .info-message {
            width: 100%;
            margin: 5mm auto 0 auto;
            padding: 0;
            text-align: center;
            font-size: 0.8em;
            font-family: monospace;
            height: 3mm;
        }
    </style>
</body>
</html>
` } } };