landingPage.controller("vereinCtrl", ['$scope', 'lpk_dataProvider', '$state', function($scope, lpkData, $state){
    $scope.ziele = [
        {
            head: "Wir blicken durch",
            body: "Die Landespressekonferenz Brandenburg e.V . will Regierungs- und Parlamentsarbeit transparent machen. Wir wollen hinter die Kulissen schauen und unseren Mitgliedern mehr Möglichkeiten verschaffen, die Öffentlichkeit tiefgründig und kompetent zu unterrichten."
        },
        {
            head: "Wir sind",
            body: "ein Zusammenschluss von festangestellten und freien Journalisten, die als Redakteure oder Korrespondenten hauptberuflich für Tages- oder Wochenzeitungen, Zeitschriften, Nachrichtenagenturen, Rundfunk- oder Fernsehanstalten oder Onlinedienste arbeiten. Wir berichten ständig über politische, wirtschaftliche, soziale und kulturelle Themen des Landes Brandenburg. ",
            shorter: true
        },
        {
            head: "Wir mischen uns ein",
            body: "Ob in Pressekonferenzen, Hintergrundgesprächen, Festveranstaltungen oder Interventionen, wir wollen der politischen Medienberichterstattung ein Gesicht geben und erste Adresse für aktuelle Themen sein. Wir unterstützen Kollegen bei ihrer Arbeit und knüpfen ein redaktionelles Netzwerk in Brandenburg."
        }

    ]

    $scope.bestellen = function(){
        window.location.href = "mailto:bestellung@lpk-brandenburg.de?subject=LPK-Verzeichnis 2016 bestellen&body=Sehr geehrte Damen und Herren,%0D%0A%0D%0Ahiermit möchte ich ein Exemplar des LPK-Verzeichnisses bestellen.%0D%0A%0D%0AMit freundlichen Grüßen";
    }

    $scope.mitgliedWerden = function(){
        $state.go("home.mitglied")
    }

    $scope.satzung = function(){
        window.open('/assets/files/Satzung_lpk-bb.pdf', '_blank')
    }

}])