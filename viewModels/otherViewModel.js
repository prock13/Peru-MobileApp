 function footerTemplateModel() {
    this.lists = { name:'Listas', ID:'list-nav', icon: 'list-ul', section: 'secLists' };
    this.badges = { name:'Insignias', ID:'badge-nav', icon: 'trophy', section: 'secBadges' };
    this.more = { name:'Más', ID:'more-nav', icon:'info-sign', section:'viewMore' };
    this.out = { name:'Cerrar Sesión', ID:'btnLogout', icon:'signout', section:'main'};
  }
ko.applyBindings(new footerTemplateModel());