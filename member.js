function skillsMember() {
  return {
    restrict: 'E',
    templateUrl: 'app/members/skills.html',
    scope: {
      user : '=',
      editable : '=',
      addSkill : '&',
      removeSkill : '&'
           }
        }
} 
