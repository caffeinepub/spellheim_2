import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type CharacterProfile = {
    name : Text;
    archetype : Text;
    cosmeticOptions : [Text];
    audioVolume : Nat; // Range: 0-100
    basicStats : Nat; // Placeholder for basic progression stats
  };

  let characterProfiles = Map.empty<Principal, CharacterProfile>();

  public shared ({ caller }) func saveCharacterProfile(profile : CharacterProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    if (profile.audioVolume > 100) {
      Runtime.trap("Volume must be in range 0-100");
    };
    characterProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerCharacterProfile() : async ?CharacterProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can retrieve profiles");
    };
    characterProfiles.get(caller);
  };

  public query ({ caller }) func getCharacterProfile(principal : Principal) : async ?CharacterProfile {
    if (caller != principal and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can retrieve profiles");
    };
    characterProfiles.get(principal);
  };
};
