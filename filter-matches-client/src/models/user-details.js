
var UserDetails = function UserDetails(data) {
    this.contacts_exchanged = data.contacts_exchanged || 0 ;
    this.favourite = data.favourite || "";
    this.display_name = data.display_name || "";
    this.age = data.age || -1;
    this.job_title = data.job_title || "";
    this.height_in_cm = data.height_in_cm || -1;
    this.city = data.city || "";
    this.main_photo = data.main_photo || "";
    this.compatibility_score = data.compatibility_score || -1;
    this.religion = data.religion || "";
    this.userId = data.userId || -1;
    // this.loc_type = (data.loc && data.loc.type) ? data.loc.type : "Point";
    // this.loc_coordinates = (data.loc && data.loc.coordinates) ? data.loc.coordinates : -1;
}

export default UserDetails
