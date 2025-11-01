/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { Query } from "mongoose";

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public readonly query: Record<string, string | undefined>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, string | undefined>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Filter: category, status, author, etc.
  filter(): this {
    const filter: Record<string, any> = { ...this.query };
    const excludedFields = ["searchTerm", "searchTerms", "sort", "fields", "page", "limit"];
    excludedFields.forEach(field => delete filter[field]);

    this.modelQuery = this.modelQuery.find(filter);
    return this;
  }

  // Search: safe search using RegExp
  search(searchableFields: string[]): this {
    const searchTerm = this.query.searchTerm || this.query.searchTerms;
    if (searchTerm && typeof searchTerm === "string" && searchTerm.trim() !== "") {
      const regex = new RegExp(searchTerm.trim(), "i"); // safe RegExp
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(field => ({ [field]: regex })),
      });
    }
    return this;
  }

  // Sorting
  sort(): this {
    const sortBy = this.query.sort || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sortBy);
    return this;
  }

  // Select specific fields
  fields(): this {
    const fields = this.query.fields?.split(",").join(" ") || "";
    if (fields) {
      this.modelQuery = this.modelQuery.select(fields);
    }
    return this;
  }

  // Pagination
  paginate(): this {
    const page = this.query.page ? parseInt(this.query.page) : 1;
    const limit = this.query.limit ? parseInt(this.query.limit) : 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  // Build final query
  build() {
    return this.modelQuery;
  }

  // Meta info for pagination
  async getMeta() {
    const totalDocuments = await this.modelQuery.model.countDocuments();
    const page = this.query.page ? parseInt(this.query.page) : 1;
    const limit = this.query.limit ? parseInt(this.query.limit) : 10;
    const totalPages = Math.ceil(totalDocuments / limit);

    return {
      total: totalDocuments,
      page,
      limit,
      totalPages,
    };
  }
}
