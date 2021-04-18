import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  chatThread: string = "";

  constructor(private socket: Socket) {
    let newChat = new Observable(observer => {
      this.socket.on('newChat', (data) => {
        var msg = data.nickName + ": " + data.message + "\n";
        observer.next(this.chatThread + msg);
      })
      return () => {
        this.socket.disconnect();
      }
    });

    let typing = new Observable(observer => {
      this.socket.on('typing', (data) => {
        var msg = data.nickName + " is typing..."
        if (this.chatThread.length < 0) {
          observer.next(this.chatThread + msg + "\n")
        } else {
          observer.next(this.chatThread);
        }
      })
      return () => {
        this.socket.disconnect();
      }
    });

    let typingOff = new Observable(observer => {
      this.socket.on('typing_off', (data) => {
        var msg = this.chatThread;
        var s = msg.indexOf(data.nickName + " is typing...");
        if (s >= 0) {
          var e = 1 + msg.indexOf('\n', s);
          msg = msg.substring(0, s) + msg.substring(e);
          observer.next(msg);
        } else {
          observer.next(this.chatThread);
        }
      })
      return () => {
        this.socket.disconnect();
      }
    });

    newChat.subscribe((x: string) => {
      this.chatThread = x;
      (<HTMLInputElement>document.getElementById("chatMsgThread")).value = this.chatThread;
    });
    typing.subscribe((x: string) => {
      this.chatThread = x;
      (<HTMLInputElement>document.getElementById("chatMsgThread")).value = this.chatThread;
    });
    typingOff.subscribe((x: string) => {
      this.chatThread = x;
      (<HTMLInputElement>document.getElementById("chatMsgThread")).value = this.chatThread;
    });
  }

  ngOnInit(): void {

  }

  sendChat() {
    //console.log(document.getElementById("nickNameInput").slot);

    this.socket.emit('chat', {
      nickName: (<HTMLInputElement>document.getElementById("nickNameInput")).value,
      chatMsg: (<HTMLInputElement>document.getElementById("chatInput")).value
    });
    (<HTMLInputElement>document.getElementById("chatInput")).value = "";
    this.socket.emit('typeoff', {
      nickName: (<HTMLInputElement>document.getElementById("nickNameInput")).value,
    });
  }

  type() {
    //console.log('typing');
    this.socket.emit('type', {
      nickName: (<HTMLInputElement>document.getElementById("nickNameInput")).value,
    });
  }

  typeoff() {
    //console.log('typingoff');
    if ((<HTMLInputElement>document.getElementById("chatInput")).value == "") {
      this.socket.emit('typeoff', {
        nickName: (<HTMLInputElement>document.getElementById("nickNameInput")).value,
      });
    } else {
      let s = this.socket;
      setTimeout(function () {
        s.emit('typeoff', {
          nickName: (<HTMLInputElement>document.getElementById("nickNameInput")).value,
        });
      }, 1000)
    }
  }

  openForm() {
    document.getElementById("myForm").style.display = "block";
  }

  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

}