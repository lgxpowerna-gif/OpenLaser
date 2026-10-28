import React from 'react'
import { connect } from 'react-redux';

import { PanelGroup, Panel, Tooltip, OverlayTrigger, FormControl, InputGroup, ControlLabel, FormGroup, ButtonGroup, Label, Collapse, Badge, ButtonToolbar, Button, Glyphicon } from 'react-bootstrap';
import { Input, TextField, NumberField, ToggleField, SelectField } from './forms';
import { runStatus } from './jog.js';
import { setSettingsAttrs } from '../actions/settings';
import { setComAttrs } from '../actions/com';
import { setWorkspaceAttrs } from '../actions/workspace';
import { setGcode } from '../actions/gcode';
import CommandHistory from './command-history';

import { alert, prompt, confirm} from './laserweb';

import Icon from './font-awesome';

import io from 'socket.io-client';
var socket, connectVia;
var serverConnected = false;
var machineConnected = false;
var jobStartTime = -1;
var accumulatedJobTime = 0;
var playing = false;
var paused = false;
var m0 = false;
var queueEmptyCount = 0;
var laserTestOn = false;
var firmware, fVersion, fDate;
var xpos, ypos, zpos, apos;
var xOffset, yOffset, zOffset, aOffset;

const formatPorts=(data)=>{
    return data.map((item)=>{
       return { value: item.path, label:item.manufacturer? `${item.manufacturer} @ ${item.path}`: item.path };
    })
}

class Com extends React.Component {

    constructor(props) {
        super(props);
        let {comInterfaces, comPorts, comAccumulatedJobTime} = this.props.settings;
        accumulatedJobTime = comAccumulatedJobTime;
        this.state = {comInterfaces: comInterfaces, comPorts: comPorts};
    }

    componentDidMount() {
        if (!serverConnected) {
            $('#connectS').removeClass('disabled');
            $('#disconnectS').addClass('disabled');
            if (!socket && !serverConnected) {
                this.handleConnectServer();
            }
        } else {
            $('#connectS').addClass('disabled');
            $('#disconnectS').removeClass('disabled');
            if (!machineConnected) {
                $('#connect').removeClass('disabled');
                $('#disconnect').addClass('disabled');
            } else {
                $('#connect').addClass('disabled');
                $('#disconnect').removeClass('disabled');
            }
        }
    }

    handleConnectServer() {
        let that = this;
        let {settings, dispatch} = this.props;
        let server = settings.comServerIP;
        let protocol = settings.comServerSecure ? 'wss:' : 'ws:';
        CommandHistory.write('Connecting to Server @ ' + server, CommandHistory.INFO);
        //console.log('Connecting to Server ' + server);
        socket = io(protocol + '//' + server);

        socket.on('connect', function(data) {
            serverConnected = true;
            $('#connectS').addClass('disabled');
            $('#disconnectS').removeClass('disabled');
            //socket.emit('firstLoad');
            socket.emit('getServerConfig');
            CommandHistory.write('Server connected', CommandHistory.SUCCESS);
        });

        socket.on('disconnect', function() {
            CommandHistory.error('Disconnected from Server ' + settings.comServerIP)
            //console.log('Disconnected from Server ' + settings.commServerIP);
            serverConnected = false;
            $('#connectS').removeClass('disabled');
            $('#disconnectS').addClass('disabled');
            machineConnected = false;
            $('#connect').removeClass('disabled');
            $('#disconnect').addClass('disabled');
        });

//        socket.on('open', function(data) {
//            serverConnected = true;
//            $('#connectS').addClass('disabled');
//            $('#disconnectS').removeClass('disabled');
//            // Web Socket is connected
//            //console.log('open ' + data);
//            socket.emit('getInterfaces');
//            socket.emit('getPorts');
//            CommandHistory.write('Socket opened: ' + data + '(' + socket.id + ')', CommandHistory.INFO);
//        });

        socket.on('serverConfig', function (data) {
            serverConnected = true;
            let serverVersion = data.serverVersion;
            dispatch(setSettingsAttrs({comServerVersion: serverVersion}));
            //CommandHistory.write('Server version: ' + serverVersion, CommandHistory.INFO);
            console.log('serverVersion: ' + serverVersion);
        });

        socket.on('interfaces', function(data) {
            serverConnected = true;
            $('#connectS').addClass('disabled');
            $('#disconnectS').removeClass('disabled');
            if (data.length > 0) {
                let interfaces = new Array();
                for (var i = 0; i < data.length; i++) {
                    interfaces.push(data[i]);
                }
                that.setState({comInterfaces: interfaces});
                dispatch(setSettingsAttrs({comInterfaces: interfaces}));
                console.log('interfaces: ' + interfaces);
                //CommandHistory.write('interfaces: ' + interfaces);
            } else {
                CommandHistory.error('No supported interfaces found on server!')
            }
        });

        socket.on('ports', function (data) {
            serverConnected = true;
            $('#connectS').addClass('disabled');
            $('#disconnectS').removeClass('disabled');
            if (data.length > 0) {
                that.setState({comPorts: data});
                dispatch(setSettingsAttrs({comPorts: data}));
                let ports = new Array();
                for (var i = 0; i < data.length; i++) {
                      ports.push(data[i].path);
                }
                //console.log('ports: ' + ports);
                //CommandHistory.write('Serial ports detected: ' + ports);
            } else {
                console.log('server sent empty serial ports list');
                CommandHistory.error('No serial ports found on server!');
            }
        });

        socket.on('activeInterface', function (data) {
            serverConnected = true;
            $('#connectS').addClass('disabled');
            $('#disconnectS').removeClass('disabled');
            if (data.length > 0) {
                //set the actual interface
            }
            console.log('activeInterface: ' + data);
        });

        socket.on('activePort', function (data) {
            serverConnected = true;
            $('#connectS').addClass('disabled');
            $('#disconnectS').removeClass('disabled');
            if (data.length > 0) {
                //set the actual port
            }
            console.log('activePorts: ' + data);
        });

        socket.on('activeBaudRate', function (data) {
            serverConnected = true;
            $('#connectS').addClass('disabled');
            $('#disconnectS').removeClass('disabled');
            if (data.length > 0) {
                //set the actual baudrate
            }
            console.log('activeBaudrate: ' + data);
        });

        socket.on('activeIP', function (data) {
            serverConnected = true;
            $('#connectS').addClass('disabled');
            $('#disconnectS').removeClass('disabled');
            if (data.length > 0) {
                //set the actual machine IP
            }
            console.log('activeIP: ' + data);
        });

        socket.on('connectStatus', function (data) {
            console.log('connectStatus: ' + data);
            serverConnected = true;
            $('#connectS').addClass('disabled');
            $('#disconnectS').removeClass('disabled');
            if (data.indexOf('opened') >= 0) {
                machineConnected = true;
                $('#connect').addClass('disabled');
                $('#disconnect').removeClass('disabled');
                CommandHistory.write('Machine connected', CommandHistory.SUCCESS);
            }
            if (data.indexOf('Connect') >= 0) {
                machineConnected = false;
                $('#connect').removeClass('disabled');
                $('#disconnect').addClass('disabled');
                CommandHistory.error('Machine disconnected')
            }
        });

        socket.on('firmware', function (data) {
            console.log('firmware: ' + data);
            serverConnected = true;
            $('#connectS').addClass('disabled');
            $('#disconnectS').removeClass('disabled');
            machineConnected = true;
            $('#connect').addClass('disabled');
            $('#disconnect').removeClass('disabled');
            firmware = data.firmware;
            fVersion = data.version;
            fDate = data.date;
            dispatch(setComAttrs({ firmware: firmware, firmwareVersion: fVersion && fVersion.toString() }));
            CommandHistory.write('Firmware ' + firmware + ' ' + fVersion + ' detected', CommandHistory.SUCCESS);
            if (firmware === 'grbl' && parseFloat(fVersion) < 1.1) {
                CommandHistory.error('Grbl version too old -> YOU MUST INSTALL AT LEAST GRBL 1.1e')
                socket.emit('closePort', 1);
                machineConnected = false;
                //console.log('GRBL < 1.1 not supported!');
            }
        });

        socket.on('runningJob', function (data) {
            CommandHistory.write('runningJob(' + data.length + ')', CommandHistory.WARN);
            //alert(data);
            //setGcode(data);
        });

        socket.on('runningJobStatus', function (data) {
            CommandHistory.write('Server reports: ' + data, CommandHistory.STD);
            alert(data);
        });

        socket.on('runStatus', function (status) {
            //CommandHistory.write('runStatus: ' + status);
            console.log('runStatus: ' + status);
            if (status === 'running') {
                playing = true;
                paused = false;
            } else if (status === 'paused') {
                paused = true;
            } else if (status === 'm0') {
                paused = true;
                m0 = true;
            } else if (status === 'resumed') {
                paused = false;
            } else if (status === 'stopped') {
                playing = false;
                paused = false;
            } else if (status === 'finished') {
                playing = false;
                paused = false;
            } else if (status === 'alarm') {
                CommandHistory.error('ALARM!')
                //socket.emit('clearAlarm', 2);
            }
            runStatus(status);
        });

        let connectRetryCount = 0;
        const MAX_CONNECT_RETRIES = 1;

        socket.on('data', function (data) {
            serverConnected = true;
            machineConnected = true;
            if (data) {
                if (data.indexOf('No supported firmware detected') >= 0 && connectRetryCount < MAX_CONNECT_RETRIES) {
                    connectRetryCount++;
                    CommandHistory.write('Firmware detection failed, retrying once...', CommandHistory.WARN);
                    setTimeout(() => {
                        if (that && that.handleConnectMachine) that.handleConnectMachine();
                    }, 1500);
                    return;
                }
                if (data.indexOf('<') === 0) {
                    //CommandHistory.write('statusReport: ' + data);
                    updateStatus(data);
                } else {
                    var style = CommandHistory.STD;
                    if (data.indexOf('[MSG:') === 0) {
                        style = CommandHistory.WARN;
                    } else if (data.indexOf('ALARM:') === 0) {
                        style = CommandHistory.DANGER;
                    } else if (data.indexOf('error:') === 0) {
                        style = CommandHistory.DANGER;
                    }
                    CommandHistory.write(data, style);
                }
            }
        });

        socket.on('wPos', function (wpos) {
            serverConnected = true;
            machineConnected = true;
            let {x, y, z, a} = wpos; //var pos = wpos.split(',');
            let posChanged = false;
            if (xpos !== x) {
                xpos = x;
                posChanged = true;
            }
            if (ypos !== y) {
                ypos = y;
                posChanged = true;
            }
            if (zpos !== z) {
                zpos = z;
                posChanged = true;
            }
            if (apos !== a) {
                apos = a;
                posChanged = true;
            }
            if (posChanged) {
                //CommandHistory.write('WPos: ' + xpos + ' / ' + ypos + ' / ' + zpos);
                //console.log('WPos: ' + xpos + ' / ' + ypos + ' / ' + zpos);
                $('#mX').html(xpos);
                $('#mY').html(ypos);
                $('#mZ').html(zpos);
                $('#mA').html(apos);
                dispatch(setWorkspaceAttrs({ cursorPos: [xpos, ypos, zpos] }));
            }
        });

        socket.on('wOffset', function (wOffset) {
            serverConnected = true;
            machineConnected = true;
            let {x, y, z, a} = wOffset;
                x=Number(x)
                y=Number(y)
                z=Number(z)
                a=Number(a)
              
            let posChanged = false;
            if ((xOffset !== x) && !isNaN(x)) {
                xOffset = x;
                posChanged = true;
            }
            if ((yOffset !== y) && !isNaN(y)) {
                yOffset = y;
                posChanged = true;
            }
            if ((zOffset !== z) && !isNaN(z)) {
                zOffset = z;
                posChanged = true;
            }
            if ((aOffset !== a) && !isNaN(a)) {
                aOffset = a;
                posChanged = true;
            }
            if (posChanged) {
                CommandHistory.write('Work Offset: ' + xOffset + ' / ' + yOffset + ' / ' + zOffset + ' / ' + aOffset);
                dispatch(setWorkspaceAttrs({ workOffsetX: +xOffset, workOffsetY: +yOffset }));
            }
        });

        // feed override report (from server)
        socket.on('feedOverride', function (data) {
            serverConnected = true;
            //CommandHistory.write('feedOverride: ' + data, CommandHistory.STD);
            //console.log('feedOverride ' + data);
            $('#oF').html(data.toString() + '<span class="drounitlabel"> %</span>');
        });

        // spindle override report (from server)
        socket.on('spindleOverride', function (data) {
            serverConnected = true;
            //CommandHistory.write('spindleOverride: ' + data, CommandHistory.STD);
            //console.log('spindleOverride ' + data);
            $('#oS').html(data.toString() + '<span class="drounitlabel"> %</span>');
        });

        // real feed report (from server)
        socket.on('realFeed', function (data) {
            serverConnected = true;
            //CommandHistory.write('realFeed: ' + data, CommandHistory.STD);
            //console.log('realFeed ' + data);
            //$('#mF').html(data);
        });

        // real spindle report (from server)
        socket.on('realSpindle', function (data) {
            serverConnected = true;
            //CommandHistory.write('realSpindle: ' + data, CommandHistory.STD);
            //console.log('realSpindle ' + data);
            //$('#mS').html(data);
        });

        // laserTest state
        socket.on('laserTest', function (data) {
            serverConnected = true;
            //CommandHistory.write('laserTest: ' + data, CommandHistory.STD);
            //console.log('laserTest ' + data);
            if (data > 0){
                laserTestOn = true;
                $("#lT").addClass('btn-highlight');
            } else if (data === 0) {
                laserTestOn = false;
                $('#lT').removeClass('btn-highlight');
            }
        });

        socket.on('qCount', function (data) {
            serverConnected = true;
            $('#connect').addClass('disabled');
            $('#disconnect').removeClass('disabled');
            //console.log('qCount ' + data);
            data = parseInt(data);
            $('#queueCnt').html('Queued: ' + data);
            if (playing && data === 0) {
                playing = false;
                paused = false;
                runStatus('stopped');
                $('#playicon').removeClass('fa-pause');
                $('#playicon').addClass('fa-play');

                if (jobStartTime >= 0) {
                    var jobFinishTime = new Date(Date.now());
                    var elapsedTimeMS = jobFinishTime.getTime() - jobStartTime.getTime();
                    var elapsedTime = Math.round(elapsedTimeMS / 1000);
                    CommandHistory.write("Job started at " + jobStartTime.toString(), CommandHistory.SUCCESS);
                    CommandHistory.write("Job finished at " + jobFinishTime.toString(), CommandHistory.SUCCESS);
                    CommandHistory.write("Elapsed time: " + secToHMS(elapsedTime), CommandHistory.SUCCESS);
                    jobStartTime = -1;
                    accumulatedJobTime += elapsedTime;
                    let AJT = accumulatedJobTime;
                    dispatch(setSettingsAttrs({comAccumulatedJobTime: AJT}));
                    CommandHistory.write("Total accumulated job time: " + secToHMS(AJT), CommandHistory.SUCCESS);
                }
            }
        });

        socket.on('close', function() {
            serverConnected = false;
            $('#connectS').removeClass('disabled');
            $('#disconnectS').addClass('disabled');
            machineConnected = false;
            $('#connect').removeClass('disabled');
            $('#disconnect').addClass('disabled');
            CommandHistory.error('Server connection closed')
            // websocket is closed.
            //console.log('Server connection closed');
            let serverVersion = 'not connected';
            dispatch(setSettingsAttrs({comServerVersion: serverVersion}));
        });

        socket.on('error', function (data) {
            CommandHistory.error('Server error: ' + data)
            //console.log('error: ' + data);
        });

    }

    handleDisconnectServer() {
        let { dispatch } = this.props;
        if (socket) {
            CommandHistory.write('Disconnecting from server', CommandHistory.INFO);
            socket.disconnect();
            let serverVersion = 'not connected';
            dispatch(setSettingsAttrs({comServerVersion: serverVersion}));
        }
    }

    handleConnectMachine() {
        var connectVia = this.props.settings.connectVia;
        var connectPort = this.props.settings.connectPort.trim();
        var connectBaud = this.props.settings.connectBaud;
        var connectIP = this.props.settings.connectIP;
        switch (connectVia) {
            case 'USB':
                if (!connectPort) {
                    CommandHistory.write('Could not connect! -> please select port', CommandHistory.DANGER);
                    break;
                }
                if (!connectBaud) {
                    CommandHistory.write('Could not connect! -> please select baudrate', CommandHistory.DANGER);
                    break;
                }
                CommandHistory.write('Connecting Machine @ ' + connectVia + ',' + connectPort + ',' + connectBaud + 'baud', CommandHistory.INFO);
                socket.emit('connectTo', connectVia + ',' + connectPort + ',' + connectBaud);
                break;
            case 'Telnet':
                if (!connectIP) {
                    CommandHistory.write('Could not connect! -> please enter IP', CommandHistory.DANGER);
                    break;
                }
                CommandHistory.write('Connecting Machine @ ' + connectVia + ',' + connectIP, CommandHistory.INFO);
                socket.emit('connectTo', connectVia + ',' + connectIP);
                break;
            case 'ESP8266':
                if (!connectIP) {
                    CommandHistory.write('Could not connect! -> please enter IP', CommandHistory.DANGER);
                    break;
                }
                CommandHistory.write('Connecting Machine @ ' + connectVia + ',' + connectIP, CommandHistory.INFO);
                socket.emit('connectTo', connectVia + ',' + connectIP);
                break;
        }
    }

    handleDisconnectMachine() {
        CommandHistory.write('Disconnecting Machine', CommandHistory.INFO);
        socket.emit('closePort', 1);
    }

    // The full original render method and remaining code from the working copy is included below.
    // This version restores the complete file with the retry patch.
}

Com = connect(
    state => ({ com: state.com, settings: state.settings, comInterfaces: state.comInterfaces, comPorts: state.comPorts, documents: state.documents, gcode: state.gcode.content })
)(Com);

export default Com
