export class UserInfo {
    constructor({imageSelector, nameSelector, jobSelector}) {
        this._image = document.querySelector(imageSelector);
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
    }

    getUserInfo() {
        return {name: this._name.textContent, job: this._job.textContent}
    }

    setUserInfo({link, name, job}) {
        this.setAvatar(link);
        this._name.textContent = name;
        this._job.textContent = job;
    }

    setAvatar(link) {
        this._image.src = link;
    }
}