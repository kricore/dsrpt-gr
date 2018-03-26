import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { NativeRouter, Route, Link, Switch } from 'react-router-native'
import Home from './app/components/home';
import List from './app/components/list/main-list';
import Item from './app/components/item/item';
import MapComponent from './app/components/map/map';
import Stack from 'react-router-native-stack';
import { Mentors, Mentor } from './app/components/mentors';
import { Speakers, Speaker } from './app/components/speakers';
import { Teams, Team } from './app/components/teams';
import { Navigation } from './app/ui';
import SideMenu from 'react-native-side-menu';
import Schedule from './app/components/schedule';
import LastYear from './app/components/lastYear';
import { Eventora } from './app/components/webview';
import Finalists from './app/components/finalists';

import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
export default class App extends Component {

  @observable isMenuOpen = false;

  constructor(props){
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  @action
  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  @action
  updateMenuState(isOpen){
    this.isMenuOpen = isOpen;
  }

  render() {
    
    const menu = <Navigation onItemSelected={this.toggleMenu} />

    return (
      <NativeRouter>
          <SideMenu 
            menu={menu} 
            isOpen={this.isMenuOpen} 
            onChange={(isOpen) => { this.updateMenuState(isOpen)} }
          >
              <View style={styles.container}>
                <View style={styles.navbar}>
                  <Button
                    style={styles.navbutton}
                    onPress={this.toggleMenu}
                    title="Menu"
                  />
                </View>
                <ScrollView style={styles.content}>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/news" component={List} />
                    <Route path="/news/:id" component={Item} />
                    <Route exact path="/mentors" component={Mentors} />
                    <Route path="/mentors/:id" component={Mentor} />
                    <Route exact path="/speakers" component={Speakers} />
                    <Route path="/speakers/:id" component={Speaker} />
                    <Route exact path="/teams" component={Teams} />
                    <Route path="/teams/:id" component={Team} />
                    <Route exact path="/eventora" component={Eventora} />
                    <Route exact path="/schedule" component={Schedule} />
                    <Route exact path="/last-year" component={LastYear} />
                    <Route exact path="/finalists" component={Finalists} />


                    {/*
                    <Route exact path="/sponsors" component={} />
                    <Route exact path="/form-small" component={} />
                    <Route exact path="/form-large" component={} />
                    */}
                    <Route path="/map" component={MapComponent} />
                  </Switch>
                </ScrollView>
              </View>
          </SideMenu>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    marginTop: 10
  },
  navbar: {
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    //flex: 1,
    marginTop: 20,
    //flex: 1,
  },
  navbutton: {
    padding: 20,
    flex: 1
  }
});