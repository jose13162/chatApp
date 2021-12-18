import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Group, Meta } from "@/models";
import { $axios } from "~/utils/nuxt-instance";

interface IndexPayload {
  page?: number;
  perPage: number;
}

interface CreatePayload {
  title: string;
}

@Module({ name: "groups/main", stateFactory: true, namespaced: true })
export default class GroupStore extends VuexModule {
  private groups = [] as Group[];
  private group = {} as Group;
  private meta = {} as Meta;
  private wasLoaded = false as Boolean;

  public get $all() {
    return this.groups;
  }

  public get $single() {
    return this.group;
  }

  public get $meta() {
    return this.meta;
  }

  public get $wasLoaded() {
    return this.wasLoaded;
  }

  @Mutation
  private UPDATE_GROUPS(groups: Group[]) {
    this.groups.push(...groups);
  }

  @Mutation
  private UPDATE_GROUP(group: Group) {
    this.group = group;
  }

  @Mutation
  private UPDATE_META(meta: Meta) {
    this.meta = meta;
  }

  @Mutation
  private UPDATE_STATUS(wasLoaded: Boolean) {
    this.wasLoaded = wasLoaded;
  }

  @Action({ rawError: true })
  public async index({ page, perPage }: IndexPayload) {
    const { data: groups, meta } = await $axios.$get(
      `/groups?page=${page}&perPage=${perPage}`
    );

    this.context.commit("UPDATE_GROUPS", groups);
    this.context.commit("UPDATE_META", meta);
    this.context.commit("UPDATE_STATUS", true);
  }

  @Action({ rawError: true })
  public async create(payload: CreatePayload) {
    await $axios.$post("/groups", payload);
  }
}
